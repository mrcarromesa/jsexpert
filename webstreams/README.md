# Webstreams

- Obter o arquivo de exemplo:

- [Kaggle](kaggle.com/datasets)

- Os mesmos estão em `server/data/anime.csv`

---

### Utilizar type module

- No arquivo `package.json` utilizar o seguinte:

```json
"type": "module",
```

- A partir da versão `18` do node é possível utilizar o recurso `watch`, recurso semelhante ao nodemon

- Criado um listening no arquivo `index.js` podemos executa-lo utilizando o comando:

```shell
npm run dev
```

- E em outro terminal podemos baixar os dados como streaming utilizando o `curl` com o parametro `-N`:

```shell
curl -N localhost:3000
```

- Para testar os options podemos executar o comando:

```shell
curl -X OPTIONS -N localhost:3000
```

- Para exibir os headers também utilizamos o comando:

```shell
curl -i -X OPTIONS -N localhost:3000
```

### Webstream server

- No arquivo `server/index.js` adicionar o seguinte:

```js
Readable.toWeb(createReadStream('./data/animes.csv'))
  .pipeTo(new WritableStream({
    write(chunk) {
      items++;
      res.write(chunk)
    },
    close() {
      res.end('Items => ' + items.toString())
    }
  }))
```

### csv to json

- Instalar a extensão em server:

```shell
npm i csvtojson
```

- Feito isso acionamos ele no index.js:

```js
import { Readable, Transform } from 'node:stream';
import csvtojson from 'csvtojson';

// ... more


Readable.toWeb(createReadStream('./data/animes.csv'))
  // o passo a passo que cada item individual vai trafegar
  .pipeThrough(Transform.toWeb(csvtojson()))
  // é a ultima etapa
  .pipeTo(new WritableStream({
    write(chunk) {
      items++;
      res.write(chunk)
    },
    close() {
      res.end('Items => ' + items.toString())
    }
  }))
```

- E ao executar o código e acessando via curl ele retornará JSON no formato NDJSON, ou seja um JSON separado por quebra de linha

- Podemos adicionar o seguinte também:

```js
.pipeThrough(new TransformStream({
    transform(chunk, controller) {
      console.log('chunk', chunk)
      controller.enqueue(chunk)
    }
  }))
```

- Com isso no lado servidor ele consola vários arrays de Buffers.

- Para converter o Buffers por string podemos fazer o seguinte:

```js
.pipeThrough(new TransformStream({
    transform(chunk, controller) {
      console.log('chunk', Buffer.from(chunk).toString())
      controller.enqueue(chunk)
    }
  }))
```

- Por fim chegamos nesse formato:

```js
.pipeThrough(new TransformStream({
    transform(chunk, controller) {
      const data = JSON.parse(Buffer.from(chunk));
      controller.enqueue(JSON.stringify({
        title: data.title,
        description: data.description,
        url_anime: data.url_anime
      }).concat('\n'))
    }
  }))
```

- Com isso podemos manipular os dados para o formato que queremos que sejam consumidos.

- Para simular o envio asyncrono dos dados como sendo sob demanda podemos adicionaro setTimeout:

```js
import { setTimeout } from 'node:timers/promises';

// more

.pipeTo(new WritableStream({
    async write(chunk) {
      await setTimeout(1000) // <--- AQUI
      items++;
      res.write(chunk)
    },
    close() {
      res.end('Items => ' + items.toString())
    }
  }))
```

- Para monitorar a quantidade de items que foram consumidos adicionamos o seguinte:

```js
let items = 0; 

req.once('close', _ => console.log('connection was closed!', items)) // <---
```

### App

- Criar a pasta /app
- Adicionar uma depedencia para facilitar o desenvolvimento:

```shell
npm i -D http-server
```

- No arquivo `package.json` adicionar o seguinte:

```json
"scripts": {
  "start": "npx http-server ."
}
```