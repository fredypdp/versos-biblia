const express = require('express');
const xml2js = require('xml2js');
const fs = require('fs');

const app = express();

// Lê o arquivo XML
const xmlData = fs.readFileSync('biblia.xml');

// Converte o XML para objeto JavaScript
let parsedData;
xml2js.parseString(xmlData, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  parsedData = result;
});

// Rota para obter um texto aleatório de uma tag v
app.get('/randomText', (req, res) => {
  if (!parsedData) {
    res.status(500).json({ error: 'Erro ao processar o arquivo XML.' });
    return;
  }

  const verses = parsedData.usfx.book[0].v;
  const randomIndex = Math.floor(Math.random() * verses.length);
  const randomVerse = verses[randomIndex];

  res.json({ text: randomVerse._ }); // Retorna o texto da tag v aleatória
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
