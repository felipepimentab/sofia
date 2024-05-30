import {  writeFile, readFile } from 'fs';
export type Film = string[];

/**
 * 
 * @param path 
 * @returns 
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
 * 
 * @param path 
 * @param data 
 * @returns 
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
 * 
 * @param arr 
 * @param str 
 * @returns 
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
 * Parses a string into a Film object
 * @param text unparsed text with the Film's informations
 * @returns An array with the parsed fields
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
 * @description converts an array of Film objects into a string in the .tsv format
 */
export const convertToTSV = (films: Film[]): string => {
  const header = headers.join('\t')
  let rows: string[] = [];
  films.forEach((film) => rows.push(film.join('\t')));
  return `${header}\n${rows.join("\n")}`;
}

/**
 * @constant headers Array of strings for the table header
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
 * @constant ignore Array of string to be ingored when searching for attributes
 */
const ignore: string[] = [
  ...headers,
  'Data e local de produção',
  'Data e local de lançamento',
  'formato completo',
  'Dados de produção',
];