import iconv from 'iconv-lite';
import { readLatin1File, writeFileAt, createFilmFromText, convertToTSV, type Film } from './lib.js';

/**
 * Path to the input file containing raw film data in Latin-1 encoding.
 * Can be provided as a command line argument or defaults to './example/iah'.
 * @constant
 * @type {string}
 */
const INPUT_FILE_PATH = process.argv[2] || './example/iah';
/**
 * Path where the processed TSV file will be written.
 * Can be provided as a command line argument or defaults to './example/output.tsv'.
 * @constant
 * @type {string}
 */
const OUTPUT_FILE_PATH = process.argv[3] || './example/output.tsv';
/**
 * Path for the temporary debug file that stores intermediate processing results.
 * Can be provided as a command line argument or defaults to './temp/debug.txt'.
 * @constant
 * @type {string}
 */
const TEMP_FILE_PATH = process.argv[4] || './temp/debug.txt';

(async function () {
  /**
   * Raw file contents read from the input file in Latin-1 encoding.
   * @type {string}
   */
  const file = await readLatin1File(INPUT_FILE_PATH);
  /**
   * Preprocessed text with HTML tags removed and empty lines cleaned up.
   * The text is prepared for ISO-8859-1 encoding conversion.
   * @type {string}
   */
  const iso = file
    .toString()                           // converts to string
    .split('\n')                          // splits on line breaks
    .slice(1)                             // removes first line
    .join('')                             // joins back in a string
    .replace(/<[^>]+>/g, '\n')            // removes HTML tags
    .replace(/^\s*$(?:\r\n?|\n)/gm, '');  // removes empty lines
  /**
   * Buffer containing the text decoded from ISO-8859-1 encoding.
   * This step ensures proper character encoding conversion.
   * @type {Buffer}
   */
  const buffer = iconv.decode(Buffer.from(iso, 'latin1'), 'iso-8859-1');
  /**
   * Complete text content encoded in UTF-8 format.
   * This ensures proper handling of special characters and diacritics.
   * @type {string}
   */
  const text = iconv.encode(buffer, 'utf-8').toString();
  /**
   * Regular expression pattern that matches number patterns (e.g., "1/1") with line breaks.
   * Used to split the text into individual film records.
   * @type {RegExp}
   */
  const splitRegex = /\n\d+\/\d+\n/;
  /**
   * Array containing individual film records after splitting the text.
   * Each element represents a complete film entry to be processed.
   * @type {string[]}
   */
  const body: string[] = text.split(splitRegex).slice(1);
  /**
   * Array of processed film objects.
   * Each element contains structured data extracted from the raw text.
   * @type {Film[]}
   */
  let films: Film[] = [];
  body.forEach(film => films.push(createFilmFromText(film)) );
  /**
   * Final TSV-formatted string containing all film data.
   * Includes headers and tab-separated values for each film record.
   * @type {string}
   */
  const tsv: string = convertToTSV(films);

  await writeFileAt(TEMP_FILE_PATH, text);
  await writeFileAt(OUTPUT_FILE_PATH, tsv);
})();