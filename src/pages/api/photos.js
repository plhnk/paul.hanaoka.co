import UnsplashApiClient from '../../server/api/photos.mjs';

export default async function handler(req, res) {
  const UnsplashApi = UnsplashApiClient();
  const collectionId = '10621197'
  const response = await UnsplashApi.collections.getPhotos({collectionId, perPage: 30});

  if (response.errors) {
    // Handle errors
    res.status(500).json({ errors: response.errors });
  } else {
    // Send the photos as the response
    res.status(200).json({ photos: response.response.results });
  }
}

// wow this was not intuitive at all...but that's on me