import { NextRequest, NextResponse } from 'next/server';
import { PassThrough } from 'stream';
import { Readable } from 'stream';
import archiver from 'archiver';
import {
  parseChannelUrl,
  fetchChannelVideoMetadata,
  type VideoMetadata,
  type ThumbnailUrls,
} from '@/lib/youtube';

const OCR_VIDEO_CAP = 20;

async function runOcrOnThumbnail(thumbnailUrls: ThumbnailUrls): Promise<string> {
  const url =
    thumbnailUrls.high ?? thumbnailUrls.medium ?? thumbnailUrls.default;
  if (!url) return '';
  const imageRes = await fetch(url);
  if (!imageRes.ok) return '';
  const buffer = Buffer.from(await imageRes.arrayBuffer());
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker('eng');
  try {
    const {
      data: { text },
    } = await worker.recognize(buffer);
    return (text ?? '').trim();
  } finally {
    await worker.terminate();
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.YOUTUBE_API_KEY) {
      return NextResponse.json(
        { message: 'Export unavailable: server is missing YOUTUBE_API_KEY.' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const channelUrl = typeof body?.channelUrl === 'string' ? body.channelUrl.trim() : '';
    const includeOcr = Boolean(body?.includeOcr);

    if (!channelUrl) {
      return NextResponse.json({ message: 'channelUrl is required' }, { status: 400 });
    }

    const parsed = parseChannelUrl(channelUrl);
    if (!parsed) {
      return NextResponse.json(
        { message: 'Invalid YouTube channel URL. Use youtube.com/@Handle or youtube.com/channel/UCxxxx' },
        { status: 400 }
      );
    }

    const data = await fetchChannelVideoMetadata(channelUrl);

    if (includeOcr && data.videos.length > 0) {
      const toOcr = data.videos.slice(0, OCR_VIDEO_CAP);
      for (let i = 0; i < toOcr.length; i++) {
        const video = toOcr[i] as VideoMetadata;
        try {
          video.thumbnailText = await runOcrOnThumbnail(video.thumbnailUrls);
        } catch {
          video.thumbnailText = '';
        }
      }
    }

    const slug = data.channelId.replace(/^UC/, '');
    const date = new Date().toISOString().slice(0, 10);
    const filename = `youtube-channel-export-${slug}-${date}.zip`;

    const passThrough = new PassThrough();
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(passThrough);
    archive.append(JSON.stringify(data, null, 2), { name: 'metadata.json' });
    await archive.finalize();

    const webStream = Readable.toWeb(passThrough) as ReadableStream<Uint8Array>;
    return new NextResponse(webStream, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    if (message.includes('quota exceeded')) {
      return NextResponse.json({ message }, { status: 503 });
    }
    if (message.includes('not found') || message.includes('Invalid')) {
      return NextResponse.json({ message }, { status: 400 });
    }
    console.error('youtube-channel-export error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
