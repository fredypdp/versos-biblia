const express = require('express');
const xml2js = require('xml2js');
const fs = require('fs');

const app = express();

// Lê o arquivo XML
const xmlData = fs.readFileSync('seuarquivo.xml');

// Converte o XML para objeto JavaScript
let parsedData;
xml2js.parseString(xmlData, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  parsedData = result;
  console.log(parsedData); // Verifique os dados do XML após a conversão
});

// Rota para obter um texto aleatório de uma tag v
app.get('/', (req, res) => {
  if (!parsedData || !parsedData.usfx || !parsedData.usfx.book || !parsedData.usfx.book[0] || !parsedData.usfx.book[0].v) {
    res.status(500).json({ error: 'Estrutura do arquivo XML não está conforme o esperado.' });
    return;
  }

  const verses = parsedData.usfx.book[0].v;
  const randomIndex = Math.floor(Math.random() * verses.length);
  const randomVerse = verses[randomIndex];

  // Verifique se o randomVerse está definido e se possui a propriedade '_'
  if (!randomVerse || !randomVerse['_'] || !Array.isArray(randomVerse['_']) || randomVerse['_'].length === 0) {
    res.status(500).json({ error: 'Estrutura do verso não está conforme o esperado.' });
    return;
  }

  // Retorna o texto do verso na tag v aleatória
  const verseText = randomVerse['_'][0];

  res.json({ text: verseText });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
