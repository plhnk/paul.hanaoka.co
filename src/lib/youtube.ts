/**
 * YouTube Data API v3 client and URL parsing for channel export.
 * Requires YOUTUBE_API_KEY in env.
 */

const BASE = 'https://www.googleapis.com/youtube/v3';

export interface ThumbnailUrls {
  default?: string;
  medium?: string;
  high?: string;
  maxres?: string;
}

export interface VideoMetadata {
  videoId: string;
  title: string;
  viewCount: number;
  duration: string;
  thumbnailUrls: ThumbnailUrls;
  thumbnailText?: string;
}

export interface ChannelExportResult {
  channelId: string;
  channelTitle: string;
  exportedAt: string;
  videos: VideoMetadata[];
}

export type ChannelUrlKind = { kind: 'handle'; handle: string } | { kind: 'channelId'; channelId: string };

/**
 * Validates and parses a YouTube channel URL into a handle or channel ID.
 * Supports: youtube.com/@Handle, youtube.com/channel/UCxxxx
 */
export function parseChannelUrl(url: string): ChannelUrlKind | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'youtube.com' && host !== 'youtu.be') return null;

    // /@Handle or /@Handle/videos
    const handleMatch = u.pathname.match(/^\/@([^/]+)/);
    if (handleMatch) return { kind: 'handle', handle: handleMatch[1] };

    // /channel/UCxxxx
    const channelMatch = u.pathname.match(/^\/channel\/(UC[\w-]+)/);
    if (channelMatch) return { kind: 'channelId', channelId: channelMatch[1] };

    return null;
  } catch {
    return null;
  }
}

function apiKey(): string | undefined {
  return process.env.YOUTUBE_API_KEY;
}

async function get<T>(path: string, params: Record<string, string>): Promise<T> {
  const key = apiKey();
  if (!key) throw new Error('YOUTUBE_API_KEY is not set');
  const search = new URLSearchParams({ ...params, key });
  const res = await fetch(`${BASE}${path}?${search.toString()}`);
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 403 && body.includes('quotaExceeded')) throw new Error('YouTube API quota exceeded. Try again later.');
    throw new Error(`YouTube API error: ${res.status} ${body.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

interface ChannelsListResponse {
  items?: Array<{
    id: string;
    snippet?: { title: string };
    contentDetails?: { relatedPlaylists?: { uploads?: string } };
  }>;
}

/**
 * Resolve handle or channel ID to channel ID and uploads playlist ID.
 */
export async function getChannelUploadsPlaylistId(
  parsed: ChannelUrlKind
): Promise<{ channelId: string; channelTitle: string; uploadsPlaylistId: string }> {
  let channelId: string;
  if (parsed.kind === 'handle') {
    const data = await get<ChannelsListResponse>('/channels', {
      part: 'id,snippet,contentDetails',
      forHandle: parsed.handle,
    });
    const item = data.items?.[0];
    if (!item?.id) throw new Error(`Channel not found for handle: @${parsed.handle}`);
    channelId = item.id;
  } else {
    channelId = parsed.channelId;
  }

  const data = await get<ChannelsListResponse>('/channels', {
    part: 'snippet,contentDetails',
    id: channelId,
  });
  const item = data.items?.[0];
  if (!item) throw new Error('Channel not found');
  const uploadsId = item.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) throw new Error('Channel has no uploads playlist');
  const channelTitle = item.snippet?.title ?? '';

  return { channelId, channelTitle, uploadsPlaylistId: uploadsId };
}

interface PlaylistItemsResponse {
  nextPageToken?: string;
  items?: Array<{
    snippet?: { resourceId?: { videoId?: string } };
  }>;
}

/**
 * Fetch all video IDs from a playlist (uploads).
 */
export async function getPlaylistVideoIds(playlistId: string): Promise<string[]> {
  const ids: string[] = [];
  let pageToken: string | undefined;
  do {
    const data = await get<PlaylistItemsResponse>('/playlistItems', {
      part: 'snippet',
      playlistId,
      maxResults: '50',
      ...(pageToken && { pageToken }),
    });
    for (const item of data.items ?? []) {
      const videoId = item.snippet?.resourceId?.videoId;
      if (videoId) ids.push(videoId);
    }
    pageToken = data.nextPageToken;
  } while (pageToken);
  return ids;
}

interface VideoSnippet {
  title?: string;
  thumbnails?: {
    default?: { url?: string };
    medium?: { url?: string };
    high?: { url?: string };
    maxres?: { url?: string };
  };
}

interface VideosListResponse {
  items?: Array<{
    id: string;
    snippet?: VideoSnippet;
    contentDetails?: { duration?: string };
    statistics?: { viewCount?: string };
  }>;
}

/**
 * Fetch video details (title, thumbnails, viewCount, duration) for up to 50 IDs.
 */
export async function getVideosDetails(videoIds: string[]): Promise<VideoMetadata[]> {
  if (videoIds.length === 0) return [];
  const idList = videoIds.slice(0, 50).join(',');
  const data = await get<VideosListResponse>('/videos', {
    part: 'snippet,contentDetails,statistics',
    id: idList,
  });
  const result: VideoMetadata[] = [];
  for (const item of data.items ?? []) {
    const snippet = item.snippet ?? {};
    const thumbnails = snippet.thumbnails ?? {};
    result.push({
      videoId: item.id,
      title: snippet.title ?? '',
      viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
      duration: item.contentDetails?.duration ?? '',
      thumbnailUrls: {
        default: thumbnails.default?.url,
        medium: thumbnails.medium?.url,
        high: thumbnails.high?.url,
        maxres: thumbnails.maxres?.url,
      },
    });
  }
  return result;
}

/**
 * Full pipeline: channel URL -> channel info + array of video metadata.
 */
export async function fetchChannelVideoMetadata(channelUrl: string): Promise<ChannelExportResult> {
  const parsed = parseChannelUrl(channelUrl);
  if (!parsed) throw new Error('Invalid YouTube channel URL. Use youtube.com/@Handle or youtube.com/channel/UCxxxx');

  const { channelId, channelTitle, uploadsPlaylistId } = await getChannelUploadsPlaylistId(parsed);
  const videoIds = await getPlaylistVideoIds(uploadsPlaylistId);

  const videos: VideoMetadata[] = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const details = await getVideosDetails(batch);
    videos.push(...details);
  }

  return {
    channelId,
    channelTitle,
    exportedAt: new Date().toISOString(),
    videos,
  };
}
