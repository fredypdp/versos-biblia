from flask import Flask
import xml.etree.ElementTree as ET
import random

app = Flask(__name__)

# Carregar o arquivo XML
tree = ET.parse('biblia.xml')
root = tree.getroot()

# Encontrar todas as tags <v> no XML
verses = root.findall(".//v")
verses_text = [verse.text.strip() for verse in verses if verse.text is not None]  # Extrair textos dos versos

random.shuffle(verses_text)  # Embaralhar a lista de versos

# Rota para retornar um texto aleatório com a tag <v> sem remover
@app.route('/random_verse')
def random_verse():
    if verses_text:
        random_verse = random.choice(verses_text)  # Escolhe um verso aleatório sem remover
        return random_verse
    else:
        return "Todos os versos já foram enviados."

if __name__ == '__main__':
    app.run(debug=True)
