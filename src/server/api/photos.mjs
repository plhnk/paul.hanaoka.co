import { createApi } from 'unsplash-js';

const UnsplashApiClient = () => {
  return createApi({
    apiUrl: 'https://api.unsplash.com',
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    fetch,
  });
};

export default UnsplashApiClient;
