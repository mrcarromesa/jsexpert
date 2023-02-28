import Service from './service.js';
console.log('I`m alive!');

const service = new Service();

postMessage({ eventType: 'alive' })


// woker modules só funciona no chrome por enquanto
// worker funciona mas ele com import/export não funciona por enquanto
onmessage = ({data}) => {
  const { query, file } = data;

  if (!file) {
    return;
  }
  service.processFile({
    query,
    file,
    onOcurrenceUpdate: (args) => {
      postMessage({ eventType: 'ocurrenceUpdate', ...args })
    },
    onProgress: (total) => postMessage({ eventType: 'progress', total })
  })
}