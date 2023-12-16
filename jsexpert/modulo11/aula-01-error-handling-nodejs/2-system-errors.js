import timers from 'timers/promises'

const timeoutAsync = timers.setTimeout;

// const results = ['1', '2'].map(async (item) => {
//   console.log('starting processing!')
//   await timeoutAsync(100)
//   console.log(item)
//   console.log(await Promise.resolve('timeout order!'))
//   await timeoutAsync(100)
//   console.count('debug')

//   return parseInt(item) * 2
// })

// console.log('results', await Promise.all(results))

setTimeout(async () => {
  console.log('starting processing!')
  await timeoutAsync(100)
  console.count('debug')
  console.log(await Promise.resolve('timeout order!'))
  await timeoutAsync(100)
  console.count('debug')

  await Promise.reject('promise reject on timeout!')

}, 1000)

const throwError = (msg) => { throw new Error(msg) }


try {
  console.log('hello')
  console.log('world')
  throwError('error dentro do try/catch')
} catch (error) {
  console.log('pego no catch!', error.message)
} finally {
  console.log('executed after all!')
}


// Formas de capturar errors na aplicação.
process.on('unhandledRejection', (e) => {
  console.log('unhandledRejection', e.message || e)
})

process.on('uncaughtException', (e) => {
  console.log('uncaughtException', e.message || e)
  process.exit(1)
})

Promise.reject('promise rejected!')

// if the Promise.reject was into from another context, it wil catch by unhandledRejection
setTimeout(async () => {
  await Promise.reject('promised async/await rejected!')
})

// but if it is in a global context, it will be catch by uncaughtException
// await Promise.reject('promised async/await rejected!')

// uncaughtException
setTimeout(() => {
  throwError('error catch out')
})