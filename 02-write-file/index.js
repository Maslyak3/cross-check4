const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);
stdout.write('Hi, please write text to be added to the file: \n');
stdin.on('data', (data) => {
  const text = data.toString().trim();
  if (text === 'exit') {
    stdout.write('Goodbye!\n');
    process.exit();
  }
  writeStream.write(`${text}\n`, (err) => {
    if (err) throw err;
    stdout.write('Text was added. Please write more or type "exit" to quit:\n');
  });
});
process.on('SIGINT', () => {
  stdout.write('\nGoodbye!\n');
  process.exit();
});
