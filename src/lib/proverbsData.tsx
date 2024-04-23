const fs = require('fs');
const passages = require('./proverbsList');

const API_KEY = process.env.ESV_API_KEY;

let allData: { [key: string]: any } = {};

const fetches = passages.map((passage: any, index: number) => {
  const API_URL = `https://api.esv.org/v3/passage/text/?q=${passage}`;

  return fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Token ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      allData[passage] = data;
    })
    .catch((error) => console.error('Error:', error));
});

Promise.all(fetches).then(() => {
  fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(`./data/proverbs.json`, JSON.stringify(allData));
});