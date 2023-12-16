InjectHttpInterceptor()

import http from 'http';
import { InjectHttpInterceptor } from './../index.js'

// curl -i localhost:3000
function handelRequest(request, response) {
  // response.setHeader('X-Instrumented-By', 'CarlosRodolfo')
  response.end('Hello world!')
}

const server = http.createServer(handelRequest)
const port = 3000
server.listen(port, () => console.log('server running at', server.address().port))