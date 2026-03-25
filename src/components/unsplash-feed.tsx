import UnsplashFeedClient from '@/components/unsplash-feed-client';
import { getSortedPhotos } from '@/server/content/photos';

const PhotoFeed = ({ className }: { className?: string }) => {
  const photos = getSortedPhotos();

  return (
    <UnsplashFeedClient
      className={className}
      initialPhotos={photos.slice(0, 7)}
      totalCount={photos.length}
    />
  );
};

export default PhotoFeed;
