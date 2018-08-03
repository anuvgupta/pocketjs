from os import walk
from json import dumps

files = []
for (dirpath, dirnames, filenames) in walk('./src'):
    files.extend(filenames)
    break

docs = {}
for f in files:
    with open('src/' + f, 'r') as file:
        content = file.read()
        docs[f[:-3]] = content

js = 'function getDocsSource() { return ' + dumps(docs) + '; }'

with open('docs.js', 'w') as file:
    file.write(js)
