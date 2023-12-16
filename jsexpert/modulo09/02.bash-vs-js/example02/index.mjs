$.verbose = false
import isSafe from 'safe-regex'
import { setTimeout  } from 'timers/promises'
await $`docker run -p "8080:80" -d nginx`
await setTimeout(500)
const req = await $`curl --silent localhost:8080`
console.log(`req\n`, req.stdout)

const containers = await $`docker ps`

const exp = /(?<containerId>\w+)\W+(?=nginx)/
// const expUnsafe = /(x+x+)+y/ // unsafe
if (!isSafe(exp)) 
  throw new Error('unsafe regex')

console.log(containers.toString().match(exp));

const { groups: { containerId } } = containers.toString().match(exp)

const logs = await $`docker logs ${containerId}`
console.log('logs\n', logs.stdout)

const rm = await $`docker rm -f ${containerId}`
console.log('rm -f\n', rm.stdout)