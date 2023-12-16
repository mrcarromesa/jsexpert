# Projeto

### Permitir importar arquivo json
- como arquivos json não são modulos
- não dá para importa-lo diretamente para tal podemos utilizar o seguinte no `package.json`:
- `"type": "module"`

- e no comando adicionar o seguinte:

```shell
node --experimental-json-modules
```

---

## Await fora de função async

- Para utilizar await fora de função async podemos adicionar uma flag na execução do node para permitir isso, basta no arquivo `package.json` adicionar o seguinte:

```json
--experimental-top-level-await
```

- Aqui:

```json
"dev": "npx nodemon --ignore database.json --exec node --experimental-json-modules --experimental-top-level-await src/index.js",
```

## Testes

- Para realizar testes vamos utilizar o seguinte:

```shell
npm i -D mocha chai nyc sinon
```

- Para o `.nycrc` conseguir compreender o ECMA script modules precisamos instalar a dependencia:

```shell
npm i -D reify
```

- No arquivo `package.json` adicionar o seguinte:

```json
"test:cov": "npx nyc npx mocha -r reify --parallel test/*.test.js"
```

- O `-r reify` fará com que o mocha realize o require do reify e o reify por sua vez irá compilar o código utilizando a sintaxe mais antiga do js