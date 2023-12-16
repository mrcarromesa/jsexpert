import { fork } from 'child_process'

const file = './data/All_Pokemon_short.csv'

const PROCESS_COUNT = 10

const backgroundTaskFile = './src/backgroundTask.js'

const process = new Map()

for(let index = 0; index < PROCESS_COUNT; index++) {
  const child = fork(backgroundTaskFile, [file]) // Criar vários processos e inicializar esses processos

  

  process.set(child.pid, child) // Depois podemos fazer o algoritmo de round robin para disparar para esses processos
}