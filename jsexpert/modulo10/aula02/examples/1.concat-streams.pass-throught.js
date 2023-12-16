import { Writable, PassThrough } from 'stream'

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


const output = Writable({
  write(chunk, enc, cb) {
    const data = chunk.toString().replace(/\n/, "")
    // ?=- -> ele faz procurar a partir do "-" e olhar para tras
    // :"(?<name>.*) -> procura pelo conteudo dentro das aspas apos o ":" e extrai somente o name
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
    cb()
  }
})

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // end: false => impede que a stream feche sozinha
    current.pipe(prev, { end: false })

    // so finaliza o anterior se todos estiverem fechados
    // como colocamos o end em false, vamos manipular quando o current terminar.
    // quando terminar, vamos verificar se todos no pipeline se encerraram
    // ele vai então forçar a cadeia do anterior a se fechar
    current.on('end', () => items.every(s => s.ended) && prev.end())
    return prev
  }, new PassThrough())
}

merge(results)
  .pipe(output)

results[0].pipe(output)
results[1].pipe(output)