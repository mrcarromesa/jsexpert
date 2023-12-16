'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter upadated', msg))

// event.emit(eventName, 'oi')
// event.emit(eventName, 'tchau')

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    
    // continuar o ciclo de vida
    target[propertyKey] = newValue
    return true 
  },
  get: (object, prop) => {
    // console.log('called', { object, prop })
    return object[prop]
  }
})

// jajá e sempre!
setInterval(() => {
  proxy.counter += 1
  console.log('[3]: interval!')
  if (proxy.counter === 10) clearInterval(this)
}, 200)


// Muitos programadores fazem para já sair executando, utilizando o time de zero no setTimeout
// setTimeout(() => {
//   proxy.counter = 4
//   console.log('timeout!')
// }, 0)

// futuro
setTimeout(() => {
  proxy.counter = 4
  console.log('[2]: timeout!')
}, 100)

// se quero que execute imediatamente ou não utilizamos o setImmediate = setTimeout(Function,0)
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter)
})

// -----

// executa agora, mas acaba com o ciclo de vida do node
process.nextTick(() => {
  // interrompe a pilha de execução do javascript e irá adicionar essa execução no meio, terá prioridade total na execução do node
  // é uma má prática
  proxy.counter = 2
  console.log('[0]: nextTick')
})

