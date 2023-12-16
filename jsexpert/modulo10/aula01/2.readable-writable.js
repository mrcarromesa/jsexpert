import { Readable, Writable } from 'stream'

// fonte de dados
const readable = Readable({
  read() {
    // é como se estivesse rodando o stdin
    this.push('Hello World 1')
    this.push('Hello World 2')
    this.push('Hello World 3')

    // informa que os dados acabaram utilizando o null
    this.push(null)
  }
})

// saida de dados
const writable = Writable({
  write(chunk, enconding, cb) {
    console.log('msg', chunk.toString())
    // precisa chamar o callback para executar tudo
    cb()
  }
})

readable
  // writable é sempre a saída -> imprimir, salvar, ignorar
  .pipe(writable)
  // .pipe(process.stdout)