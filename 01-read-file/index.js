const fs = require('fs');
const path = require('path');

const fylePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(fylePath, 'utf-8');
let text = '';
readStream.on('data', (chunk) => {
  text += chunk;
});
readStream.on('end', () => {
  console.log(text);
});
readStream.on('error', (err) => console.log('Error', error.message));
