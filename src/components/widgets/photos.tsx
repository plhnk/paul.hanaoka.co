'use client';
import React, { useState, useEffect } from 'react';
import UnsplashApiClient from '../../server/api/photos.mjs';
import { UnsplashPhoto } from '@/lib/utilities/types';

const UnsplashApi = UnsplashApiClient();

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

const Photos = () => {
  const [photos, setPhotos] = useState<PhotoOrMoreButton[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        const data = await response.json();

        const allPhotos = data.photos;

        const randomPhotos = getRandomPhotos(allPhotos, 3);

        setPhotos([...randomPhotos, {id:'more'}]);

        setShowMoreButton(false);

        console.log(data);
      } catch (error) {
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
    <div style={{ position: 'relative' }}>
    {photos.map((photo, index) => (
      photo.id === 'more' ? (
        showMoreButton && <button onClick={fetchPhotos} style={{ position: 'absolute', zIndex: photos.length + index }}>more photos</button>
      ) : (
        <img
          key={photo.id}
          src={photo.urls.small}
          alt={photo.altDescription}
          onClick={handleClick}
          style={{ position: 'absolute', zIndex: photos.length + index }}
        />
      )
    ))}
  </div>
  );
};

export default Photos;
