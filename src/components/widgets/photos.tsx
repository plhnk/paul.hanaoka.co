'use client';
import React, { useState, useEffect } from 'react';
import UnsplashApiClient from '../../server/api/photos.mjs';

// export default async function Index({searchParams}) {
const UnsplashApi = UnsplashApiClient();

// const clientId = process.env.UNSPLASH_ACCESS_KEY;
const collectionId = '10621197';
// const photosFetched = '5';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      // console.trace('fetchPhotos trace');
      try {
        const response = await UnsplashApi.collections.getPhotos({
          collectionId: collectionId,
        });
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    //   setPhotos = response.data.results;
      // setPhotos(response.data.results); // Update this line
    };
    console.log(fetchPhotos());
    fetchPhotos();
  }, []);

  const handleNextPhoto = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
        pics
    </div>
  );
};

export default Photos;
