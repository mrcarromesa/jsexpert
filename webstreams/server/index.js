import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { Readable, Transform } from 'node:stream';
import csvtojson from 'csvtojson';
import { WritableStream, TransformStream } from 'node:stream/web';
import { setTimeout } from 'node:timers/promises';

const PORT = 3000;
createServer(async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  let items = 0; 

  req.once('close', _ => console.log('connection was closed!', items))

  Readable.toWeb(createReadStream('./data/animes.csv'))
  // o passo a passo que cada item individual vai trafegar
  .pipeThrough(Transform.toWeb(csvtojson()))
  .pipeThrough(new TransformStream({
    transform(chunk, controller) {
      const data = JSON.parse(Buffer.from(chunk));
      controller.enqueue(JSON.stringify({
        title: data.title,
        description: data.description,
        url_anime: data.url_anime
      }).concat('\n'))
    }
  }))
  // é a ultima etapa
  .pipeTo(new WritableStream({
    async write(chunk) {
      await setTimeout(1000)
      items++;
      res.write(chunk)
    },
    close() {
      // res.end('Items => ' + items.toString())
    }
  }))

  res.writeHead(200, headers);

  // res.end('ok')
}).listen(PORT).on('listening', _ => console.log(`server is running at ${PORT}`))