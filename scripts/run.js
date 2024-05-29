import {  writeFile, readFile } from 'fs';

/**
 * Gets the content of the line following the matched line
 * @param {string[]} arr 
 * @param {string} str 
 * @returns {string}
 */
function getNextLine(arr, str) {
  const i = arr.findIndex(el => el.includes(str));
  if(!!arr[i+2] && !headers.some(s => arr[i+2].includes(s))) {
    return arr[i+1] + ' ' + arr[i+2];
  } else {
    return i>0 ? arr[i+1] : '';
  }
}

/**
 * Gets the content of the same line after a ": "
 * @param {string[]} arr 
 * @param {string} str 
 * @returns {string}
 */
function getSameLine(arr, str) {
  const line = arr.find(el => el.includes(str));
  return line ? line.split(': ')[1] : '';
}

/**
 * @constant headers Array of strings for the table header
 */
const headers = [
  'Título atribuído',
  'Outras remetências de título:',
  'Categorias',
  'Material original',
  'Ano',
  'País',
  'Cidade',
  'Estado',
  'Sinopse',
  'Termos descritores',
  'Descritores secundários',
  'Termos geográficos',
  'Produção',
  'Conteúdo examinado',
  'Fontes utilizadas:',
  'Fontes consultadas:',
  'Observações:',
]

/**
 * @class Film
 */
class Film {
  constructor(titulo, tituloAlt, categorias, material, ano, pais, cidade, estado, sinopse, termosDescritores, descritoresSecundarios, termosGeograficos, producao, conteudoExaminado, fontesExaminadas, fontesConsultadas, obervacoes) {    
    this.titulo = titulo;
    this.tituloAlt = tituloAlt;
    this.categorias = categorias;
    this.material = material;
    this.ano = ano;
    this.pais = pais;
    this.cidade = cidade;
    this.estado = estado;
    this.sinopse = sinopse;
    this.termosDescritores = termosDescritores;
    this.descritoresSecundarios = descritoresSecundarios;
    this.termosGeograficos = termosGeograficos;
    this.producao = producao;
    this.conteudoExaminado = conteudoExaminado;
    this.fontesExaminadas = fontesExaminadas;
    this.fontesConsultadas = fontesConsultadas;
    this.obervacoes = obervacoes;
  }
}

/**
 * Parses a string into a Film object
 * @param {string} text unparsed text with the Film's informations
 * @returns {Film} A Film object with the parsed fields
 */
function createFilmFromText(text) {
  /**
   * @description Array with a string for each line
   * @type Array<string>
   */
  const lines = text.split(/\r?\n/);

  const titulo = lines[0];
  const tituloAlt = getNextLine(lines, 'Outras remetências de título:');
  const categorias = getNextLine(lines, 'Categorias');
  const material = getNextLine(lines, 'Material original');
  const ano = getSameLine(lines, 'Ano');
  const pais = getSameLine(lines, 'País');
  const cidade = getSameLine(lines, 'Cidade');
  const estado = getSameLine(lines, 'Estado');
  const sinopse = getNextLine(lines, 'Sinopse');
  const termosDescritores = getNextLine(lines, 'Termos descritores');
  const descritoresSecundarios = getNextLine(lines, 'Descritores secundários');
  const termosGeograficos = getNextLine(lines, 'Termos geográficos');
  const producao = getNextLine(lines, 'Produção');
  const conteudoExaminado = getSameLine(lines, 'Conteúdo examinado');
  const fontesExaminadas = getNextLine(lines, 'Fontes utilizadas:');
  const fontesConsultadas = getNextLine(lines, 'Fontes consultadas:');
  const obervacoes = getNextLine(lines, 'Observações:');

  return new Film(
    titulo,
    tituloAlt,
    categorias,
    material,
    ano,
    pais,
    cidade,
    estado,
    sinopse,
    termosDescritores,
    descritoresSecundarios,
    termosGeograficos,
    producao,
    conteudoExaminado,
    fontesExaminadas,
    fontesConsultadas,
    obervacoes
  );
}

/**
 * @description converts an array of Film objects into a string in the .tsv format
 * @param {Film[]} data 
 * @returns 
 */
function convertToTSV(data) {
  const header = headers.join('\t')
  const rows = data.map(obj => Object.values(obj).join("\t"));
  return `${header}\n${rows.join("\n")}`;
}

(async function () {
  const INPUT_FILE_PATH = process.argv[2];
  const OUTPUT_FILE_PATH = process.argv[3];

  const text = await new Promise((resolve, reject) => {
    readFile(INPUT_FILE_PATH, (err, data) => {
      if (err || !data) reject(new Error(`\x1b[31mFailed\x1b[0m to read file at ${INPUT_FILE_PATH}.`));
      else {
        console.log(`\x1b[32mSuccessfuly\x1b[0m read file at ${INPUT_FILE_PATH}`);
        const str = data.toString('utf-8');
        resolve(str);
      }
    });
  });

  const splitRegex = /\n\d+\/629\n/;
  const body = text.split(splitRegex).slice(1);
  let films = [];

  body.forEach(film => {
    films.push(createFilmFromText(film));
  });

  const tsv = convertToTSV(films);

  await new Promise((resolve, reject) => {
    writeFile(OUTPUT_FILE_PATH, tsv, function (err) {
      if (err) {
        reject(new Error(`\x1b[31mFailed\x1b[0m to create .tsv file.`));
      } else {
        console.log(`\x1b[32mSuccessfuly\x1b[0m created file at ${OUTPUT_FILE_PATH}.`);
        resolve();
      }
    });
  });
})();