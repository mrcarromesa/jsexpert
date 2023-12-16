import http from 'http'

import { Readable } from 'stream'

function api1(req, res) {

  let count = 0
  const maxItems = 99

  const readable = Readable({
      read() {
        const everySecond = (intervalContext) => {
          if (count++ <= maxItems) {
            this.push(JSON.stringify({ id: Date.now() + count, name: `Carlos - ${count}` }) + "\n")
            return
          }
    
          clearInterval(intervalContext)
          this.push(null)
        }
        setInterval(function() { everySecond(this) })
      }
    })

    readable.pipe(res)
}

function api2(req, res) {
  let count = 0
  const maxItems = 99

  const readable = Readable({
      read() {
        const everySecond = (intervalContext) => {
          if (count++ <= maxItems) {
            this.push(JSON.stringify({ id: Date.now() + count, name: `Rodolfo - ${count}` }) + "\n")
            return
          }
    
          clearInterval(intervalContext)
          this.push(null)
        }
        setInterval(function() { everySecond(this) })
      }
    })

    readable.pipe(res)
}

//  curl localhost:3005 
http.createServer(api1).listen(3005, () => console.log('Server running at 3005'))
http.createServer(api2).listen(4000, () => console.log('Server running at 4000'))