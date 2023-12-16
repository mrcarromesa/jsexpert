import { write } from 'fs'
import { Duplex, Transform } from 'stream'

let count = 0;

// o Server é uma Duplex streaming

const server = new Duplex({
  objectMode: true, // faz não precisar trabalhar com buffer => gasta mais memoria
  encoding: 'utf-8',
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Carlos[${count}]`)
        return
      }

      clearInterval(intervalContext)
      this.push(null)
    }
    setInterval(function() { everySecond(this) })
  },

  // é como se fosse um objeto completamente diferente!
  write(chunk, enconding, cb) {
    console.log(`[writable] saving`, chunk)
    cb()
  }
})

// provar que sao canais de comunicacao diferentes
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable!\n')

// on data -> loga o que tem no .push do readable
// server.on('data', msg => console.log(`[readable] ${msg}`))

// o push deixa enviar mais dados, mesmo tendo o push!
server.push(`[duplex] hey this is a also a readable!\n`)

// server
//   .pipe(process.stdout)

const transformToUpperCase = Transform({
  // objectMode = true => trabalhar com string direto
  objectMode: true,
  transform(chunk, enc, cb) {
    cb(null, chunk.toUpperCase())
  }
})

// transform é também um duplex, mas não possuem comunicação independente
transformToUpperCase.write('[transform] hello from write!')
// o push vai ignorar o que tem na funcao transform
transformToUpperCase.push('[transform] hello from push!\n')


// junta o server = new Duplex();
// com o server.write() e o server.push()
server
  // tudo que estiver dentro de .push() ficará uppercase pois passará pelo transform
  .pipe(transformToUpperCase)
  // redireciona todos os dados de readable para writable da duplex.
  .pipe(server)

  // 03:30