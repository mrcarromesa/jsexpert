import { Readable, Writable, Transform } from "stream";
import { createWriteStream } from 'fs'

// fonte de dados
const readable = Readable({
  read() {
    for (let index = 0; index < 1e6; index++) {
    // for (let index = 0; index < 2; index++) {
      const person = { id: Date.now() + index, name: `Carlos -${index}` };
      const data = JSON.stringify(person);
      this.push(data);
    }

    // informa que os dados acabaram utilizando o null
    this.push(null);
  },
});

// processamento dos dados
const mapFields = Transform({
  transform(chunk, enconding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    cb(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, enconding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;
    // vai concatenar com o mapFields
    cb(null, "id,name\n".concat(chunk));
  },
});

// saida de dados
const writable = Writable({
  write(chunk, enconding, cb) {
    // console.log("msg", chunk.toString());
    // precisa chamar o callback para executar tudo
    cb();
  },
});

const pipeline = readable
  // pipelines
  // transform
  .pipe(mapFields)
  .pipe(mapHeaders)
  // writable é sempre a saída -> imprimir, salvar, ignorar
  // .pipe(writable);
// .pipe(process.stdout)
// jogar para um arquivo:
.pipe(createWriteStream('my.csv'))

pipeline
  .on('end', () => console.log('acabou!'))
