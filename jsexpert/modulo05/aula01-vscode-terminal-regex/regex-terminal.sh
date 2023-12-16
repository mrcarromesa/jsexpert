# a partir da pasta raiz
find . -name *.test.js
find . -name '*.test.js' -not -path '*node_modules**' # *node_modules = ignora a node_modules e ** as pasta dentro dele 
find . -name '*.js' -not -path '*node_modules**'


npm i -g ipt # lib criada por brasileiros para trabalhar com linhas de comando de forma mais simples

find . -name '*.js' -not -path '*node_modules**' | ipt

# ----

# xargs é um comando para executar para cada arquivo encontrado


find . -name '*.js' -not -path '*node_modules**' | ipt -o # o -o para selecionar multiplos arquivos

CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**'\
| ipt -o\
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# 1s => primeira linha
# ~ => primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar o \n ali antes do /g que significa global

# muda de tudo
CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**'\
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}