import os from 'os'
import cluster from 'cluster'
import { initializeServer } from './server.js'


(() => {
  // se não for o processo main, o orquestrador pode criar novas cópias
  if (!cluster.isPrimary) {
    initializeServer()
    return;
  }

  const cpusNumber = os.cpus().length
  console.log(`Primary ${process.pid} is running\n`)
  console.log(`Forking server for ${cpusNumber} CPU\n`)

  for (let index = 0; index < cpusNumber; index++) {
    cluster.fork()
  }

  // toda vez que um nó parou de funcionar
  cluster.on('exit', (worker, code, signal) => {
    // code = 0 significa que o sistema terminou corretamente...
    // !worker.exitedAfterDisconnect = Se ele não saiu apos uma desconexão signifcia que foi um erro também
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`)
      // já sabe que tem cpu disponível para trabalhar 
      cluster.fork()
    }
  })

})()