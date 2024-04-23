const fs = require('fs');

const API_KEY = 'YOUR_ESV_API_KEY'; // replace with your ESV API key
const API_URL = 'https://api.esv.org/v3/passage/text/?q=Proverbs%20' + new Date().getDate();

fetch(API_URL, {
  method: 'GET',
  headers: {
    'Authorization': `Token ${API_KEY}`
  }
})
.then(response => response.json())
.then(data => {
  fs.writeFileSync('proverbs.json', JSON.stringify(data));
})
.catch(error => console.error('Error:', error));