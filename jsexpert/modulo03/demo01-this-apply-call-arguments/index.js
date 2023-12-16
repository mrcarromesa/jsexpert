'use strict';

const { watch, promises: { readFile } } = require('fs')


class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }
  
  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()

// fica feio...
// watch(__filename, (event, filename) => file.watch(event, filename))


// explicito qual contexto:
// o bind retorna uma função com o this que foi definido, ignorando o do watchs
// watch(__filename, file.watch.bind(file))


file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])

// watch(__filename, async (event, filename) => {
//   console.log('index.js', event, filename)
//   // 
//   console.log(await (await readFile(filename)).toString())
// })