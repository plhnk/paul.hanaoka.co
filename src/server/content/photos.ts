import unsplashData from '@/lib/data/unsplash.json';
import type { UnsplashPhoto } from '@/lib/utilities/types';

type UnsplashPage = Record<string, UnsplashPhoto[]>;

export function getSortedPhotos(): UnsplashPhoto[] {
  return Object.values(unsplashData as unknown as UnsplashPage)
    .flat()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}
