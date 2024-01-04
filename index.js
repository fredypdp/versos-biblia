const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();

// Função para ler o arquivo XML
function readXMLFile() {
  const xml = fs.readFileSync('biblia.xml', 'utf-8');
  const parser = new xml2js.Parser({ explicitArray: false });
  
  let result;
  parser.parseString(xml, (err, res) => {
    if (err) {
      console.error('Erro ao analisar o arquivo XML:', err);
      return;
    }
    result = res;
  });

  return result;
}

// Rota para retornar um verso aleatório
app.get('/', (req, res) => {
  const result = readXMLFile();

  if (!result || !result.usfx || !result.usfx.book) {
    res.status(500).send('Erro na estrutura do arquivo XML.');
    return;
  }

  const books = result.usfx.book;
  const randomBookIndex = Math.floor(Math.random() * books.length);
  const randomBook = books[randomBookIndex];

  const verses = randomBook.v;
  const randomVerseIndex = Math.floor(Math.random() * verses.length);
  const randomVerse = verses[randomVerseIndex];

  // Retornar o texto do verso aleatório
  res.send(randomVerse._);
});

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
