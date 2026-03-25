import { NextRequest, NextResponse } from 'next/server';
import { convertPngToHtml } from '@/lib/png-to-table/index.ts';

export const runtime = 'nodejs';

function parsePositiveInteger(value: FormDataEntryValue | null): number | undefined {
  if (typeof value !== 'string' || value.trim() === '') {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function parseBoolean(value: FormDataEntryValue | null): boolean {
  return value === 'true' || value === 'on' || value === '1';
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/\.png$/i, '').replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '') || 'image';
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'PNG file is required' }, { status: 400 });
    }

    if (file.type && file.type !== 'image/png') {
      return NextResponse.json({ message: 'Only PNG uploads are supported' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const cellSize = parsePositiveInteger(formData.get('cellSize'));
    const maxCells = parsePositiveInteger(formData.get('maxCells'));
    const transparencyValue = formData.get('transparency');
    const flattenBgValue = formData.get('flattenBg');
    const fragment = parseBoolean(formData.get('fragment'));
    const force = parseBoolean(formData.get('force'));

    if (Number.isNaN(cellSize) || Number.isNaN(maxCells)) {
      return NextResponse.json(
        { message: 'cellSize and maxCells must be positive integers' },
        { status: 400 }
      );
    }

    const result = await convertPngToHtml(buffer, {
      cellSize,
      maxCells,
      transparency:
        transparencyValue === 'flatten' || transparencyValue === 'preserve'
          ? transparencyValue
          : undefined,
      flattenBg: typeof flattenBgValue === 'string' ? flattenBgValue : undefined,
      fragment,
      force,
    });

    const filenameBase = sanitizeFilename(file.name);
    const response = new NextResponse(result.html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filenameBase}-table.html"`,
      },
    });

    if (result.warning) {
      response.headers.set('X-Png-To-Table-Warning', result.warning.message);
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status =
      message.includes('Unable to decode PNG file') ||
      message.includes('must be') ||
      message.includes('Image is too large') ||
      message.includes('flattenBg')
        ? 400
        : 500;

    if (status === 500) {
      console.error('png-to-table error:', error);
    }

    return NextResponse.json({ message }, { status });
  }
}
