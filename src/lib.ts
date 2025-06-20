import {  writeFile, readFile } from 'fs';
export type Film = string[];

/**
 * Reads a file with Latin-1 encoding and returns its contents as a string.
 * @param path - The absolute path to the file to be read
 * @returns A promise that resolves with the file contents as a string
 * @throws Error if the file cannot be read
 */
export const readLatin1File = async (path: string) => {
  return await new Promise<string>((resolve, reject) => {
    readFile(path, { encoding: 'latin1' }, (err, data) => {
      if (err || !data) reject(new Error(`\x1b[31mFailed\x1b[0m to read file at ${path}.`));
      else {
        console.log(`\x1b[32mSuccessfuly\x1b[0m read file at ${path}`);
        resolve(data);
      }
    });
  })
};

/**
 * Writes data to a file at the specified path.
 * @param path - The absolute path where the file should be written
 * @param data - The string content to write to the file
 * @returns A promise that resolves when the file has been written
 * @throws Error if the file cannot be written
 */
export const writeFileAt = async (path: string, data: string) => {
  return await new Promise<void>((resolve, reject) => {
    writeFile(path, data, function (err) {
      if (err) reject(new Error(`\x1b[31mFailed\x1b[0m to create .tsv file.`));
      else {
        console.log(`\x1b[32mSuccessfuly\x1b[0m created file at ${path}.`);
        resolve();
      }
    });
  });
};

/**
 * Extracts an attribute value from an array of strings based on a header string.
 * Handles cases where the attribute value might span multiple elements.
 * @param arr - Array of strings containing the film record data
 * @param str - The header string to search for
 * @returns The extracted attribute value, or an empty string if not found
 */
export const getAttributeFromHeader = (arr: string[], str: string): string => {
  const i = arr.findIndex(el => el.includes(str));
  if(i<0) return '';

  if(!!arr[i+2] && !ignore.some(s => arr[i+2].includes(s))) {
    return arr[i+1] + ' ' + arr[i+2];
  } else {
    return arr[i+1];
  }
}

/**
 * Parses a raw text string containing film information into a structured Film object.
 * Processes the text by splitting it into lines and extracting relevant attributes
 * based on predefined headers.
 * @param text - Unparsed text containing the film's information
 * @returns An array of strings representing the film's attributes in a structured format
 */
export const createFilmFromText = (text: string): Film => {
  /**
   * @description Array with a string for each line
   */
  const lines: string[] = text.split(/\r?\n/);

  let attrs: string[] = [lines[0]];

  headers.slice(1).forEach((header) => {
    attrs.push(getAttributeFromHeader(lines, header).trim() || '');
  });

  return attrs;
}

/**
 * Converts an array of Film objects into a TSV (Tab-Separated Values) formatted string.
 * Creates a header row using predefined headers and formats each film's data as a tab-separated row.
 * @param films - Array of Film objects to convert
 * @returns A string containing the TSV formatted data with headers
 */
export const convertToTSV = (films: Film[]): string => {
  const header = headers.join('\t')
  let rows: string[] = [];
  films.forEach((film) => rows.push(film.join('\t')));
  return `${header}\n${rows.join("\n")}`;
}

/**
 * Predefined headers for the film database table.
 * These headers define the structure of both the input parsing and output TSV format.
 * @constant
 * @type {string[]}
 */
export const headers: string[] = [
  'Título atribuído',
  'Outras remetências de título:',
  'Categorias',
  'Material original',
  'Ano',
  'País',
  'Cidade',
  'Estado',
  'Certificados',
  'Data:',
  'Local:',
  'Sala(s):',
  'Sinopse',
  'Produção',
  'Conteúdo examinado',
  'Fontes utilizadas:',
  'Fontes consultadas:',
  'Companhia(s) produtora(s):',
  'Produção:',
  'Identidades/elenco:',
  'Termos descritores',
  'Descritores secundários',
  'Termos geográficos',
  'Código do Filme',
  'Observações:',
];

/**
 * List of strings that should be ignored when searching for attributes in the film data.
 * These strings are typically section headers or formatting markers that shouldn't be included in the actual data.
 * @constant
 * @type {string[]}
 */
const ignore: string[] = [
  ...headers,
  'Data e local de produção',
  'Data e local de lançamento',
  'formato completo',
  'Dados de produção',
];