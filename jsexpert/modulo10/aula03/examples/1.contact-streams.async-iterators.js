import { pipeline } from 'stream/promises'
import { Writable } from 'stream'

import axios from 'axios'
const API_O1 = 'http://localhost:3005'
const API_O2 = 'http://localhost:4000'

const requests = await Promise.all([
  axios({
    method:'get',
    url: API_O1,
    responseType: 'stream'
  }),
  axios({
    method:'get',
    url: API_O2,
    responseType: 'stream'
  })
])

const results = requests.map(({ data }) => data)


// writable stream
async function* output(stream) {
  for await(const data of stream) {
    // ?=- -> ele faz procurar a partir do "-" e olhar para tras
    // :"(?<name>.*) -> procura pelo conteudo dentro das aspas apos o ":" e extrai somente o name
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
  }
}

// passthrough stream
async function* merge(streams) {
  for(const readable of streams) {
    // faz trabalahar com objectMode
    readable.setEncoding('utf-8')

    for await (const chunk of readable) {
      for(const line of chunk.trim().split(/\n/)) {
        yield line
      }
    }
  }
}

await pipeline(
  merge(results),
  output
)