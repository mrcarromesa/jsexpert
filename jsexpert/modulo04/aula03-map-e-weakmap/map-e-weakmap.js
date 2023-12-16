const assert = require('assert')
const myMap = new Map();

// podem ter qualquer coisa como chave

myMap
  .set(1, 'one')
  .set('Rodolfo', { text: 'one' })
  .set(true, () => 'hello')


const myMapWhitConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
]);

// console.log({myMap})
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Rodolfo'), { text: 'one' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const objOnlyReferenceWorks = { id: 1 }
myMap.set(objOnlyReferenceWorks, { name: 'Rodolfo' })

console.log('get my map with object', myMap.get(objOnlyReferenceWorks))

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(objOnlyReferenceWorks), { name: 'Rodolfo' })


// utilitarios
// No Object seria Object.keys({ a: 1 }).length

assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Erick' }).hasOwnProperty('name')
assert.ok(myMap.has(objOnlyReferenceWorks)) // is true

// para remover um item do objeto
// delete item.id
// imperformático para o javascript
assert.ok(myMap.delete(objOnlyReferenceWorks)) // se passar uma chave inexistente retorna false
assert.deepStrictEqual(myMap.size, 3)

// Não dá para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Rodolfo",{"text":"one"}],[true,() => {}]]))


// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }


// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey' -> O usuário poderia quebrar o sistema inteiro caso implemente o toString em um object

// quaquer chave pode colidir, com as propriedades herdadas do object, como
// constructor, toString, valueOf e etc.

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}

// nao tem restrição de nome de chave
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Nao da para limpar um Obj sem reassina-lo

// No Map temos o clear()
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])


// ---- WeakMap

// Pode ser coletado após perder as referencias de memoria
// Ele é bem parecido com o Map, porém ele não é iterável.

// tem a maioria dos beneficos do Map
// MAS: nao é iterável
// Só chaves de referencia e que vc já conheça
// mais leve e preve leeak de memoria, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)