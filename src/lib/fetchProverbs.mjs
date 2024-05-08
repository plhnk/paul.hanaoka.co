import fetch from 'node-fetch';
import fs from 'fs';
import passages from './proverbsList.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.local' });

const API_KEY = process.env.ESV_API_KEY;

let allData = {};

const fetches = passages.map((passage, index) => {
  const params = new URLSearchParams({
    'include-passage-references': 'false',
    'include-verse-numbers': 'false',
    'include-short-copyright': 'false',
    'include-footnotes': 'false',
    'include-headings': 'false',
  });
  const API_URL = `https://api.esv.org/v3/passage/text/?q=${passage}&${params.toString()}`;
  
  return fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Token ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      allData[index] = data;
    })
    .catch((error) => console.error('Error:', error));
});

Promise.all(fetches).then(() => {
  fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(`./data/proverbs.json`, JSON.stringify(allData, null, 2));
});

// node fetchProverbs.mjs --> must be in directory to run this, otherwise `npm run fetchProverbs` is avail anywhere in the project