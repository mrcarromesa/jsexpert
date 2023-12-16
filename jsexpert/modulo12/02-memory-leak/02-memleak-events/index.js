import { createServer } from 'http'

import Events from 'events'
import { randomBytes } from 'crypto'

const myEvent = new Events()


function getBytes() {
  return randomBytes(1000)
}

function onData() {
  getBytes()
  const items = []
  setInterval(function interval(){ items.push(Date.now())})
}

createServer(function handler(req, res) {
  
  myEvent.on('data', onData)
  myEvent.emit('data', Date.now())
  res.end('OK')
}).listen(3010, () => console.log('running at 3010'))