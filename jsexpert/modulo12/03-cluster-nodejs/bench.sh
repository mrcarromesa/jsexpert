URL=localhost:3000
npx autocannon $URL -m POST \
  --warmup [-c 1 -d 3] \
  --connections 500 \
  --pipeline 10 \
  --renderStatusCodes

# warmup roda primeiro uma sequencia de conexoes dentro de uma duração e em seguida roda a que é para valer,
# Pois pode ser que a aplicação demora um pouco para responder as primeiras requisições

# verificar o nr de linhas dado uma pesquisa no arquivo
# cat log.txt | grep 4634 | wc -l  