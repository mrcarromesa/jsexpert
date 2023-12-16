import { database } from '../shared/data.mjs'

class Application {
  constructor(factory) {
    this.table = factory.createTable()
  }

  initialize(database) {
    this.table.render(database)
  }
}

;(async function main() {
  // para saber se é browser ou terminal verificamos se tem window...
  // se tiver window é browser 
  const path = globalThis.window ? 'browser' : 'console'
  
  // dynamic import do javascript:

  const { default: ViewFactory } = await import(`./../platforms/${path}/index.mjs`)
  const app = new Application(new ViewFactory())
  app.initialize(database)

})();