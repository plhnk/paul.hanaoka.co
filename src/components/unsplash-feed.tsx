import React, { useEffect, useState } from 'react';
import data from '../lib/data/unsplash.json';
import { UnsplashPhoto } from '@/lib/utilities/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';
import { RotateCw } from 'lucide-react';
import Link from 'next/link';

const PhotoFeed: React.FC<{ className?: string }> = ({ className }) => {
  type UnsplashPage = {
    [key: string]: UnsplashPhoto[];
  };
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loadedPhotos, setLoadedPhotos] = useState<UnsplashPhoto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 7;

  useEffect(() => {
    const sortedPhotos = Object.entries(data as unknown as UnsplashPage)
      .reduce((acc: UnsplashPhoto[], [pageNumber, page]) => {
        return acc.concat(page);
      }, [])
      .sort(
        (a: UnsplashPhoto, b: UnsplashPhoto) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    setPhotos(sortedPhotos);
  }, []);

  useEffect(() => {
    setLoadedPhotos(photos.slice(0, currentPage * photosPerPage));
  }, [photos, currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center sm:items-start gap-8 center',
        className
      )}
    >
      {loadedPhotos.map((photo, index) => (
        <figure
          // wrapper div
          className="-z-10 sm:max-w-min"
          key={photo.id}
        >
          <Image
            placeholder="blur"
            blurDataURL="photo.blur_hash"
            width={photo.width}
            height={photo.height}
            src={photo.urls.regular}
            alt={photo.alt_description}
            onLoad={(e) => ((e.target as HTMLElement).style.opacity = '1')}
            className="object-cover sm:w-auto h-auto sm:max-w-[60vw] max-w-[90vw] max-h-[80vh] bg-light/80 drop-shadow-xl p-4 pb-8 sm:p-8 sm:pb-16 rounded-sm"
          />
          <figcaption className="p-4 sm:p-8 text-pretty italic text-text/80 font-light">
            {photo.description}
          </figcaption>
        </figure>
      ))}
      <div className='sm:ml-8 '>
      {currentPage * photosPerPage >= photos.length ? (
        <Link
          href="https://unsplash.com/plhnk"
          target="_blank"
          rel="noopener noreferrer"
          className='italic'
        >
          View more at unsplash.com/plhnk
        </Link>
      ) : (
        <Button
          variant="ghost"
          className="hover:bg-card/80 hover:-translate-y-2 transition-transform transform"
          onClick={loadMore}
        >
          <RotateCw size={16} className="text-element mr-2" />
          Load more photos
        </Button>
      )}
      </div>
    </div>
  );
};

export default PhotoFeed;

// TODO style dark mode image frames