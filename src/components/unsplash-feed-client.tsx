'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UnsplashPhoto } from '@/lib/utilities/types';
import { Button } from './ui/button';

type UnsplashPage = Record<string, UnsplashPhoto[]>;

const photosPerPage = 7;

function sortPhotos(data: UnsplashPage): UnsplashPhoto[] {
  return Object.values(data)
    .flat()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export default function UnsplashFeedClient({
  className,
  initialPhotos,
  totalCount,
}: {
  className?: string;
  initialPhotos: UnsplashPhoto[];
  totalCount: number;
}) {
  const [allPhotos, setAllPhotos] = useState<UnsplashPhoto[] | null>(null);
  const [loadedPhotos, setLoadedPhotos] = useState(initialPhotos);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setIsLoadingMore(true);

    const photos =
      allPhotos ??
      sortPhotos(
        (await import('@/lib/data/unsplash.json')).default as unknown as UnsplashPage
      );

    if (!allPhotos) {
      setAllPhotos(photos);
    }

    setLoadedPhotos(photos.slice(0, nextPage * photosPerPage));
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center sm:items-start gap-8 center sm:mx-4 sm:-ml-4 lg:-ml-8 isolate',
        className
      )}
    >
      {loadedPhotos.map((photo) => (
        <figure className="-z-10 sm:max-w-min" key={photo.id}>
          <Image
            alt={photo.alt_description}
            blurDataURL={photo.blur_hash}
            className="object-cover sm:w-auto h-auto sm:max-w-[60vw] max-w-[90vw] max-h-[80vh] bg-background drop-shadow-xl p-4 pb-8 lg:p-8 sm:pb-16 rounded-sm"
            height={photo.height}
            placeholder="blur"
            sizes="(max-width: 768px) 90vw, (max-width: 1440px) 60vw, 900px"
            src={photo.urls.regular}
            width={photo.width}
          />
          <figcaption className="p-4 md:p-8 text-pretty italic text-text/80 font-light">
            {photo.description}
          </figcaption>
        </figure>
      ))}
      <div className="sm:ml-8 ">
        {loadedPhotos.length >= totalCount ? (
          <Link
            className="italic"
            href="https://unsplash.com/plhnk"
            rel="noopener noreferrer"
            target="_blank"
          >
            View more at unsplash.com/plhnk
          </Link>
        ) : (
          <Button
            className="hover:bg-card/80 hover:-translate-y-2 transition-transform transform"
            disabled={isLoadingMore}
            onClick={loadMore}
            variant="ghost"
          >
            <RotateCw size={16} className="text-element mr-2" />
            {isLoadingMore ? 'Loading…' : 'Load more photos'}
          </Button>
        )}
      </div>
    </div>
  );
}
