from flask import Flask
from lxml import etree
import random

app = Flask(__name__)

# Função para extrair versos do arquivo XML
def extract_verses(file):
    with open(file, 'rb') as xml_file:
        tree = etree.parse(xml_file)
        verses = tree.xpath(".//v/text()")
        return [verse.strip() for verse in verses if verse.strip()]  # Remove espaços em branco

verses_text = extract_verses('biblia.xml')
random.shuffle(verses_text)

@app.route('/random_verse')
def random_verse():
    global verses_text
    if verses_text:
        random_verse = random.choice(verses_text)
        return random_verse
    else:
        verses_text = extract_verses('biblia.xml')  # Recarrega os versos
        random.shuffle(verses_text)
        return "Todos os versos já foram enviados. Recarregando para mais versos."

if __name__ == '__main__':
    app.run(debug=True)
