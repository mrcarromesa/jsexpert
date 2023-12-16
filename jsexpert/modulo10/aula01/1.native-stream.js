// process.stdin.pipe(process.stdout)
// .on('data', msg => console.log('data', msg.toString()))
// .on('error', msg => console.log('error', msg.toString()))
// .on('end', _ => console.log('end'))
// .on('close', _ => console.log('close'))


// o -e é de evaluation ou o mesmo que o eval()

// terminal 1
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// terminal 2
// node -e "process.stdin.pipe(require('net').connect(1338))"

// Gera um arquivo gicante:
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http'

import { createReadStream, readFileSync } from 'fs'

http.createServer((req, res) => {
  //| MA PRATICA 
  //| // se fizer o toString() para um arquivo grande irá quebrar o node... dará erro `ERR_STRING_TOO_LONG`
  //| // const file = readFileSync('big.file').toString()
  //| // res.write(file)
  //| // res.end()
  //|_______________________________________________________


  createReadStream('big.file')
    .pipe(res)

}).listen(3000, () => console.log('running at 3000'))

// curl localhost:3000 -o output.txt