import http from 'http'

async function handler(req, res) {
  try {
    // it works catch by try/catch
    // await Promise.reject('error into handler')

    for await (const data of req) {

      // it not working catch by try/catch, it need another try catch
      await Promise.reject('error into for await')
      res.end()
    }
  } catch (error) {
    console.log('a server error has happened', error)
    res.writeHead(500)
    res.write(JSON.stringify({ message: 'internal server error!' }))
    res.end()
  }
}

http.createServer(handler).listen(3000, () => console.log('running at 3000'))