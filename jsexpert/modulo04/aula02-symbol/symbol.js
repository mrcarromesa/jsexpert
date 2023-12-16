const assert = require('assert')

// -- keys

const uniqueKey = Symbol('userName')
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

console.log('getting normal Objects', user.userName)

// sempre único em nível de endereço de memória
console.log('getting from symbol', user[Symbol['userName']])
console.log('getting from symbol', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'value for normal Objects')

assert.deepStrictEqual(user[Symbol('userName')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// verificar os symbols dentro do objeto:

// O valor é dificil de pegar mas não é secreto.
console.log('symbols', Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nm tem no codebase do node):
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// Well Known Symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // remove o ultimo e retorna
        value: this.items.pop()
      }
    }
  })
}

for (const item of obj) {
  console.log('item ' + item)
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  [Symbol.toPrimitive](correctionType) {
    if (correctionType !== 'string') throw new TypeError()

    const items = this[kItems].map(item => new Intl.DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' }).format(item))

    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))

    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}

const myDate = new MyDate(
  [2020, 03, 01],
  [2018, 02, 02]
)

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2018, 02, 02),
]

console.log('myDate', myDate)

// quando a coversão de string retorna [object Object] esse `Object` significa que podemos manipular via [Symbol.toStringTag]
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
// console.log('myDate + 1', myDate + 1)
assert.throws(() => myDate + 1, TypeError)

console.log(String(myDate))
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

// implementar o interator
assert.deepStrictEqual([...myDate], expectedDates)

;(async () => {
  for await (const item of myDate) {
    console.log('asyncIterator', item)
  }
})()

;(async () => {
  const dates = await Promise.all([...myDate])
  assert.deepStrictEqual(dates, expectedDates)
})()