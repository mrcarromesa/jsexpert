const assert = require('assert')

const obj = {}
const arr = []
const fn = () => {}

// internamente, objetos literais viram funcoes explicitas
console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)


// __proto__ é a referencia do objeto que possui as propriedades nele
// Tudo que tem dentro da instancia do objeto, será direcionada para dentro do atributo __proto__
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)


console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// Objetos literais se transformam nas funções explicitas o qual herda tudo

// o __proto__ de Object.prototype é null

// no fim tudo herda de Object que por sua vez herda de null
console.log('obj.__proto__', obj.__proto__);
console.log('obj.__proto__.__proto__', obj.__proto__.__proto__);
assert.deepStrictEqual(obj.__proto__.__proto__, null)


// ----

console.log('-------')


function Employee() {}
Employee.prototype.salary = () => "salary**"
console.log(Employee.prototype.salary())

function Supervisor() {}
// herda a instancia de employee
Supervisor.prototype = Object.create(Employee.prototype)
console.log(Supervisor.prototype.salary())
Supervisor.prototype.profitShare = () => "profitShare**"

function Manager () {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**"


// se nao chamar o new o primeiro __proto__ será sempra 
// a instancia de Function, sem herdar a classes
// para acessar as classes sem o new, pode acessar direto via prototype
console.log("Manager.prototype.__proto__ === Supervisor.prototype",Manager.prototype.__proto__ === Supervisor.prototype) // true
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

// ------

console.log('-----')

// quando chamamos com o 'new' o __proto__ recebe o prototype
console.log('manager.__proto__: %s, manager.salary(): %s',new Manager().__proto__, new Manager().salary())
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__) // true

assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)


// ----

console.log('----')

const manager = new Manager()
console.log('manager.salary()', manager.salary())
console.log('manager.profitShare()', manager.profitShare())
console.log('manager.monthlyBonuses()', manager.monthlyBonuses())


// quando damos um new o primeiro proto receberá o prototype da propria função
console.log(manager.__proto__)
// nesse caso será a {monthlyBonuses()}

// Esse segundo nível será do que herdou do Supervisor
console.log(manager.__proto__.__proto__)
// nesse caso será a {profitShare()}

// Esse terceiro nível será da herança do Supervisor que é o Employee
console.log(manager.__proto__.__proto__.__proto__)
// nesse caso será a {salary()}


// Esse quarto nível será o que todos são no javascript Object {}
console.log(manager.__proto__.__proto__.__proto__.__proto__)
// nesse caso será a {}

// Esse quint nível será null
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__)
// nesse caso será null

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)


// -----

console.log('----')

class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)
console.log('t3.ping()', t3.ping())
console.log('t3.pong()', t3.pong())
console.log('t3.shoot()', t3.shoot())

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)