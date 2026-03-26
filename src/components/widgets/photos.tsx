'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { UnsplashPhoto } from '@/lib/utilities/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RotateCw, Camera } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

type UnsplashPage = Record<string, UnsplashPhoto[]>;

function sortPhotos(data: UnsplashPage): UnsplashPhoto[] {
  return Object.values(data)
    .flat()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

function getRandomPhotos(photos: UnsplashPhoto[], count: number): UnsplashPhoto[] {
  const tempPhotos = [...photos];

  const randomPhotos: UnsplashPhoto[] = [];

  for (let i = 0; i < count; i++) {
    if (tempPhotos.length === 0) {
      break;
    }

    const randomIndex = Math.floor(Math.random() * tempPhotos.length);
    const [photo] = tempPhotos.splice(randomIndex, 1);

    if (photo) {
      randomPhotos.push(photo);
    }
  }

  return randomPhotos;
}

type MoreButtonItem = {
  id: 'more';
  isMoreButton: true;
};

type PhotoOrMoreButton = UnsplashPhoto | MoreButtonItem;

function isMoreButtonItem(photo: PhotoOrMoreButton): photo is MoreButtonItem {
  return 'isMoreButton' in photo && photo.isMoreButton;
}

const Photos: React.FC<{ className?: string }> = ({ className }) => {
  const [allPhotos, setAllPhotos] = useState<UnsplashPhoto[] | null>(null);
  const [photos, setPhotos] = useState<PhotoOrMoreButton[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  // const [touchStartX, setTouchStartX] = useState(0);

  const loadPhotos = useCallback(async () => {
    setLoading(true);

    try {
      const sortedPhotos =
        allPhotos ??
        sortPhotos(
          (await import('@/lib/data/unsplash.json'))
            .default as unknown as UnsplashPage
        );

      if (!allPhotos) {
        setAllPhotos(sortedPhotos);
      }

      const randomPhotos = getRandomPhotos(sortedPhotos, 5);

      setPhotos([...randomPhotos, { id: 'more', isMoreButton: true }]);
      setCurrentIndex(0);
      setShowMoreButton(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error loading cached photos:', error);
    }
  }, [allPhotos]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const handleClick = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    if (newIndex === photos.length - 1) {
      setShowMoreButton(true);
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
  //   setTouchStartX(event.touches[0].clientX);
  // };

  // const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
  //   if (!isMobile || photos.length <= 1) return;

  //   const touchEndX = event.touches[0].clientX;
  //   const touchDifference = touchStartX - touchEndX;

  //   if (touchDifference > 50) {
  //     // Swipe right, show next photo
  //     const newIndex = (currentIndex + 1) % photos.length;
  //     setCurrentIndex(newIndex);
  //     if (newIndex === photos.length - 1) {
  //       setShowMoreButton(true);
  //     }
  //   } else if (touchDifference < -50) {
  //     // Swipe left, show previous photo
  //     const newIndex =
  //       currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
  //     setCurrentIndex(newIndex);
  //     setShowMoreButton(false);
  //   }
  // };

  return (
    <div
      className={cn('cursor-pointer relative w-full h-full', className)}
      onClick={handleClick}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
    >
      {photos.map((photo, index) =>
        isMoreButtonItem(photo) ? (
          showMoreButton && (
            <div
              key={index + 1}
              className="w-full h-full bg-card rounded-xl flex flex-col gap-2 p-2 overflow-hidden *:flex-1 *:flex *:items-center *:justify-center *:flex-col *:rounded-lg *:text-center outline outline-background/40 -outline-offset-1 outline-1"
              style={{ position: 'absolute', zIndex: photos.length + 1 }}
            >
              <button onClick={loadPhotos} className="hover:bg-text/5 p-4">
                <RotateCw size={24} className="text-element mb-2" />
                Load more photos
              </button>
              <Link
                href="https://unsplash.com/plhnk"
                className="hover:bg-text/5 p-4"
              >
                <Camera size={24} className="text-element mb-2" />
                View collection on Unsplash
              </Link>
            </div>
          )
        ) : (
          <div
            key={index}
            style={{
              zIndex: photos.length - Math.abs(index - currentIndex),
              transform: `${isMobile ? 'translateX' : 'translateY'}(${
                (index - currentIndex) * (isMobile ? -8 : 8)
              }%) scale(${1 - Math.abs(index - currentIndex) * 0.12})`,
            }}
            className="absolute w-full h-full transition duration-300 ease-in-out shadow-background drop-shadow-md"
          >
            {loading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <Image
                placeholder="blur"
                blurDataURL={photo.blur_hash}
                key={photo.id}
                src={photo.urls.regular}
                alt={photo.alt_description}
                className="rounded-xl object-cover w-full h-full m-0 bg-background  outline outline-card/20 -outline-offset-1 outline-1"
                style={{
                  opacity: 1 - Math.abs(index - currentIndex) * 0.4,
                }}
                fill={true}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Photos;
