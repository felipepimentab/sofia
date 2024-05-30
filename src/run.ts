import iconv from 'iconv-lite';
import { readLatin1File, writeFileAt, createFilmFromText, convertToTSV, type Film } from './lib.js';

/**
 * @constant INPUT_FILE_PATH Path to input file
 */
const INPUT_FILE_PATH = process.argv[2] || './example/iah';
/**
 * @constant OUTPUT_FILE_PATH Path to outputfile
 */
const OUTPUT_FILE_PATH = process.argv[3] || './example/output.tsv';
/**
 * @constant TEMP_FILE_PATH Path to temporary (debugging) file
 */
const TEMP_FILE_PATH = process.argv[4] || './temp/debug.txt';

(async function () {
  /**
   * @description
   */
  const file = await readLatin1File(INPUT_FILE_PATH);
  /**
   * @description
   */
  const iso = file
    .toString()                           // converts to string
    .split('\n')                          // splits on line breaks
    .slice(1)                             // removes first line
    .join('')                             // joins back in a string
    .replace(/<[^>]+>/g, '\n')            // removes HTML tags
    .replace(/^\s*$(?:\r\n?|\n)/gm, '');  // removes empty lines
  /**
   * @description
   */
  const buffer = iconv.decode(Buffer.from(iso, 'latin1'), 'iso-8859-1');
  /**
   * @description String with entire text file in UTF-8 encoding
   */
  const text = iconv.encode(buffer, 'utf-8').toString();
  /**
   * @description Regex to split string on line breaks
   */
  const splitRegex = /\n\d+\/\d+\n/;
  /**
   * @description Array with an element for each line
   */
  const body: string[] = text.split(splitRegex).slice(1);
  /**
   * @description List of films
   */
  let films: Film[] = [];
  body.forEach(film => films.push(createFilmFromText(film)) );
  /**
   * @description Content for .tsv file
   */
  const tsv: string = convertToTSV(films);

  await writeFileAt(TEMP_FILE_PATH, text);
  await writeFileAt(OUTPUT_FILE_PATH, tsv);
})();