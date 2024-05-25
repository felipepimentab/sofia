import { existsSync, mkdir, writeFile, readFile } from 'fs';
import { it } from 'node:test';

(async () => {
  const INPUT_FILE_PATH = './input.txt';

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
  console.log("🚀 ~ header:", header)
  const items = text.split(splitRegex).slice(1);
  console.log("🚀 ~ items:", items.slice(0,2))
})();