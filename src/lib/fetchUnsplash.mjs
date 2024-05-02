import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.local' });

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

let allData = {};

const fetches = [];
let page = 1;

const fetchPhotos = () => {
  const collectionId = '10621197';
  const API_URL = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${ACCESS_KEY}&page=${page}`;

  return fetch(API_URL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        allData[page] = data;
        page++;
        return fetchPhotos();
      }
    })
    .catch((error) => console.error('Error:', error));
};

fetches.push(fetchPhotos());

Promise.all(fetches).then(() => {
  fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(`./data/unsplash.json`, JSON.stringify(allData, null, 2));
});

// node fetchUnsplash.mjs --> must be in directory to run this, otherwise `npm run fetchUnsplash` is avail anywhere in the project