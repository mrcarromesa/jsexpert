# COVERAGE

- Executar o projeto:

```shell
npm start
```

- Em outro terminal executar o seguinte:

```shell
\
curl localhost:3000
```

---

## Tests

- Lib utilizada:

```shell
npm i -D mocha
```

- No package.json ajustar para:

```json
"test": "npx mocha -w src/*.test.js"
```

- Adicionar a lib:

```shell
npm i -D supertest
```

---

## coverage

- Para isso podemos utilizar a lib do stambul:

```shell
npm i -D nyc
```

- Adicionando a configuração de coverage,
- criar o arquivo `.nycrc.json`