import UnsplashApiClient from '../../server/api/photos.mjs';

export default async function handler(req, res) {
  const UnsplashApi = UnsplashApiClient();
  const response = await UnsplashApi.photos.list();

  if (response.errors) {
    // Handle errors
    res.status(500).json({ errors: response.errors });
  } else {
    // Send the photos as the response
    res.status(200).json({ photos: response.response.results });
  }
}