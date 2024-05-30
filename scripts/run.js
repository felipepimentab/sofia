var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import iconv from 'iconv-lite';
import { readLatin1File, writeFileAt, createFilmFromText, convertToTSV } from './lib.js';
const INPUT_FILE_PATH = process.argv[2] || './example/iah';
const OUTPUT_FILE_PATH = process.argv[3] || './example/output.tsv';
const TEMP_FILE_PATH = process.argv[4] || './temp/debug.txt';
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield readLatin1File(INPUT_FILE_PATH);
        const iso = file
            .toString()
            .split('\n')
            .slice(1)
            .join('')
            .replace(/<[^>]+>/g, '\n')
            .replace(/^\s*$(?:\r\n?|\n)/gm, '');
        const buffer = iconv.decode(Buffer.from(iso, 'latin1'), 'iso-8859-1');
        const text = iconv.encode(buffer, 'utf-8').toString();
        const splitRegex = /\n\d+\/\d+\n/;
        const body = text.split(splitRegex).slice(1);
        let films = [];
        body.forEach(film => films.push(createFilmFromText(film)));
        const tsv = convertToTSV(films);
        yield writeFileAt(TEMP_FILE_PATH, text);
        yield writeFileAt(OUTPUT_FILE_PATH, tsv);
    });
})();
