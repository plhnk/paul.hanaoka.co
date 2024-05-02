import React, { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import data from '../lib/data/unsplash.json';
import { UnsplashPhoto } from '@/lib/utilities/types';

const PhotoFeed: React.FC = () => {
  type UnsplashPage = {
    [key: string]: UnsplashPhoto[];
  };
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 7;

  useEffect(() => {
    const sortedPhotos = Object.entries(data as unknown as UnsplashPage)
      .sort(([pageA], [pageB]) => Number(pageA) - Number(pageB))
      .reduce((acc: UnsplashPhoto[], [pageNumber, page]) => {
        if (Number(pageNumber) <= currentPage) {
          return acc.concat(
            page.sort(
              (a: UnsplashPhoto, b: UnsplashPhoto) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
          );
        }
        return acc;
      }, []);

    setPhotos(sortedPhotos);
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {photos.slice(0, currentPage * photosPerPage).map((photo, index) => (
        <div key={photo.id}>
          <Blurhash
            hash={photo.blur_hash}
            width={500}
            height={300}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
          <img
            src={photo.urls.small}
            alt={photo.alt_description}
            onLoad={(e) => ((e.target as HTMLElement).style.opacity = '1')}
            style={{ opacity: '0', transition: 'opacity 0.5s' }}
          />
          <p>{photo.description}</p>
          <a
            href={photo.links.download}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
          <p>Likes: {photo.likes}</p>
        </div>
      ))}
      <button onClick={loadMore}>Load more</button>
    </div>
  );
};

export default PhotoFeed;

//   const [photos, setPhotos] = useState<UnsplashPage>();

//   useEffect(() => {
//     const sortedPhotos = Object.entries(data as unknown as UnsplashPage).reduce(
//       (acc, [pageNumber, page]) => {
//         return {
//           ...acc,
//           [pageNumber]: page.sort(
//             (a: UnsplashPhoto, b: UnsplashPhoto) =>
//               new Date(b.created_at).getTime() -
//               new Date(a.created_at).getTime()
//           ),
//         };
//       },
//       {} as UnsplashPage
//     );
//     setPhotos(sortedPhotos);
//   }, []);

//   return (
//     <div>
//       {photos.map((photo: UnsplashPhoto, index: number) => (
// <div key={photo.id}>
//   <Blurhash
//     hash={photo.blur_hash}
//     width={500}
//     height={300}
//     resolutionX={32}
//     resolutionY={32}
//     punch={1}
//   />
//   <img
//     src={photo.urls.small}
//     alt={photo.alt_description}
//     onLoad={(e) => ((e.target as HTMLElement).style.opacity = '1')}
//     style={{ opacity: '0', transition: 'opacity 0.5s' }}
//   />
//   <p>{photo.description}</p>
//   <a
//     href={photo.links.download}
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Download
//   </a>
//   <p>Likes: {photo.likes}</p>
// </div>
//       ))}
//     </div>
//   );
