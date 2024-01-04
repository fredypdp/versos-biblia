from flask import Flask
import xml.etree.ElementTree as ET
import random

app = Flask(__name__)

# Carregar o arquivo XML
tree = ET.parse('biblia.xml')
root = tree.getroot()

# Encontrar todas as tags <v> no XML
verses = root.findall(".//v")
verses_text = [verse.text.strip() for verse in verses]  # Extrair textos dos versos
random.shuffle(verses_text)  # Embaralhar a lista de versos

# Rota para retornar um texto aleatório com a tag <v> sem repetir
@app.route('/random_verse')
def random_verse():
    if verses_text:
        random_verse = verses_text.pop()  # Remove e retorna um verso aleatório não repetido
        return random_verse
    else:
        return "Todos os versos já foram enviados."

if __name__ == '__main__':
    app.run(debug=True)