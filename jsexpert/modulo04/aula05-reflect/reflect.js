'use strict'

const assert = require('assert')

// garantir semantica e segurança em objetos

// --- apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}


assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode acontecer (raro)
// antes de executar a função alguém modifica o prototype da função, e daí o apply irá parar de funcionar:
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// problema mais comum:
// antes de executar a função alguém injeta algo assim no código.
myObj.add.apply = function () { throw new TypeError('Error1') }

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Error1"
})

// SOLUCAO
// reflect
// ---- apply
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)
// /---- apply



// --- defineProperty
// questoes semanticas
function MyDate() {}

// feio, tudo é Object, mas Object adicionanado prop para uma funcao?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })

// faz um pouco mais de sentido => pois não estou dizendo que ele é um object ou não...
Reflect.defineProperty(MyDate, 'whitReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.whitReflection(), 'Hey dude')
// /--- defineProperty


// --- deleteProperty
const withDelete = { user: 'Rodolfo'}
// imperformático, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'XuxaDaSilva' }
// bem mais performatico e respeita o ciclo de vida do javascript
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)
// /--- deleteProperty

// ---- get
// Deveriamos fazer um get somente em instanias de referencia
assert.deepStrictEqual(1['userName'], undefined)
// com reflection, retorna exception
assert.throws(() => Reflect.get(1, 'username'), TypeError)
// /---- get


// ---- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))
// /---- has

// ---- ownKeys
const user = Symbol('user')
const myObj1 = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'rodolfo'
}

// Com os metodos de object, temos que fazer 2 requisicoes
const objectKeys = [
  ...Object.getOwnPropertyNames(myObj1),
  ...Object.getOwnPropertySymbols(myObj1)
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// com reflection só um metodo
assert.deepStrictEqual(Reflect.ownKeys(myObj1) , ['id', Symbol.for('password'), user])

// /---- ownKeys
