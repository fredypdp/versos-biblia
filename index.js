const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();

let bibleData; // Armazena os dados da Bíblia após a leitura do arquivo XML

// Função para ler o arquivo XML e analisar seu conteúdo
function readAndParseXML() {
  const xml = fs.readFileSync('biblia.xml', 'utf-8');
  const parser = new xml2js.Parser({ explicitArray: false });

  parser.parseString(xml, (err, res) => {
    if (err) {
      console.error('Erro ao analisar o arquivo XML:', err);
      return;
    }
    bibleData = res;
    console.log('Arquivo XML lido e analisado com sucesso.');
  });
}

// Lê e analisa o XML quando o servidor é iniciado
readAndParseXML();

function stringToArray(string) {
  // Separando a string por quebras de linha
  const array = string.split('\r\n');

  // Removendo elementos vazios do array (linhas em branco)
  const filteredArray = array.filter((line) => line.trim() !== '');

  return filteredArray;
}

// Rota para retornar um verso aleatório
app.get('/', (req, res) => {
  if (!bibleData || !bibleData.usfx || !bibleData.usfx.book) {
    res.status(500).send('Erro na estrutura do arquivo XML.');
    return;
  }

  const books = bibleData.usfx.book;
  const randomBookIndex = Math.floor(Math.random() * books.length);
  const randomBook = books[randomBookIndex];

  const verses = stringToArray(randomBook._);
  const randomVerseIndex = Math.floor(Math.random() * verses.length);
  const randomVerse = verses[randomVerseIndex];

  console.log(verses);

  // Retornar o texto do verso aleatório
  res.json({verso: randomVerse._});
});

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
