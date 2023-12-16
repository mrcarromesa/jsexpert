const assert = require('assert')

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function* main() {
  yield 'Hello'
  yield '-'
  yield 'World'
  // yield calculation(20, 10) // sem o asterisco ele nao entende que precisa executar essa função
  yield* calculation(20, 10)
}

const generator = main()
// console.log(generator.next()) // Hello, done => false
// console.log(generator.next()) // -, done => false
// console.log(generator.next()) // World, done => false
// console.log(generator.next()) // Object [generator], done => false
// console.log(generator.next()) // 200, done => false
// console.log(generator.next()) // undefined, done => true

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

/**
 * 
 * { value: 'Hello', done: false }
 * { value: undefined, done: true }
 */

// --- Array


assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200])
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200])

// --- async operators
const { readFile, stat, readdir } = require('fs/promises')

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')
}

// console.log('promisified nao resolve as promises', [...promisified()]) // nao resolve as promises
// Promise.all([...promisified()]).then(results => console.log('promisified', results))

// closure IFE
// ;(async () => {
//   for await (const item of promisified()) {
//     console.log('for await', item.toString())
//   }
// })()


// async operator
async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

;(async () => {
  for await (const item of systemInfo()) {
    console.log('systemInfo', item)
  }
})()