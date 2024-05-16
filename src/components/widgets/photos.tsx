'use client';
import React, { useState, useEffect } from 'react';
import { UnsplashPhoto } from '@/lib/utilities/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RotateCw, Camera } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

function getRandomPhotos(photos: any, count: number) {
  // Create a copy of the array
  const tempPhotos = [...photos];

  // The array to store our random photos
  const randomPhotos = [];

  for (let i = 0; i < count; i++) {
    // Get a random index
    const randomIndex = Math.floor(Math.random() * tempPhotos.length);

    // Remove the photo at the random index from the array and add it to the randomPhotos array
    randomPhotos.push(...tempPhotos.splice(randomIndex, 1));
  }

  return randomPhotos;
}

type PhotoOrMoreButton = UnsplashPhoto & { isMoreButton?: boolean };

const Photos: React.FC<{ className?: string }> = ({ className }) => {
  const [photos, setPhotos] = useState<PhotoOrMoreButton[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      const data = await response.json();

      const allPhotos = data.photos;

      const randomPhotos = getRandomPhotos(allPhotos, 5);

      setPhotos([...randomPhotos, { id: 'more' }]);

      setShowMoreButton(false);
      setLoading(false);

      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleClick = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    if (newIndex === photos.length - 1) {
      setShowMoreButton(true);
    }
  };

  return (
    <div
      className={cn('cursor-pointer relative w-full h-full', className)}
      onClick={handleClick}
    >
      {photos.map((photo, index) =>
        photo.id === 'more' ? (
          showMoreButton && (
            <div
              key={index + 1}
              className="w-full h-full bg-card rounded-xl flex flex-col gap-2 p-2 overflow-hidden *:flex-1 *:flex *:items-center *:justify-center *:flex-col *:rounded-lg *:text-center"
              style={{ position: 'absolute', zIndex: photos.length + 1 }}
            >
              <button onClick={fetchPhotos} className="hover:bg-text/5 p-4">
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
              transform: `translateY(${(index - currentIndex) * 8}%) scale(${
                1 - Math.abs(index - currentIndex) * 0.12
              })`,
            }}
            className="absolute rounded-xl overflow-hidden w-full h-full transition duration-300 ease-in-out shadow-background drop-shadow-md"
          >
            {loading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <Image
                key={photo.id}
                src={photo.urls.regular}
                alt={photo.alt_description}
                className="object-cover w-full h-full m-0 bg-background"
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

// TODO --> have photos start on bottom
// TODO --> swipe l/r on mobile?