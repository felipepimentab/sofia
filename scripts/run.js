import {  writeFile, readFile } from 'fs';

(async () => {
  const INPUT_FILE_PATH = process.argv[2];

  const text = await new Promise((resolve, reject) => {
    readFile(INPUT_FILE_PATH, (err, data) => {
      if (err || !data) reject(new Error(`\x1b[31mFailed\x1b[0m to read file at ${INPUT_FILE_PATH}.`));
      else {
        console.log(`\x1b[32mSuccess\x1b[0m reading file at ${INPUT_FILE_PATH}`);
        const str = data.toString('utf-8');
        resolve(str);
      }
    });
  })

  const splitRegex = /\n\d+\/629\n/;
  const header = text.split(splitRegex).slice(0,1);
  const items = text.split(splitRegex).slice(1);

  items.forEach(item => {
    console.log(item);
    console.log('------------------')
  });
})();