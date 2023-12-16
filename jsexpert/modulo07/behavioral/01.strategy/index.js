import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mogoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postegresStrategy.js"

const postgressConnectionString = "postgres://root:senha001@localhost:5433/heroes"
const postegresContext = new ContextStrategy(new PostgresStrategy(postgressConnectionString))
await postegresContext.connect();

const mongoDBConnectionString = 'mongodb://root:senhaadmin@localhost:27017/heroes'
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))

await mongoDBContext.connect()

const data = [{
  name: 'carlosrodolfo',
  type: 'transaction'
}, {
  name: 'mariasilva',
  type: 'activityLog'
}]

const contextTypes = {
  transaction: postegresContext,
  activityLog: mongoDBContext
}

for(const { type, name } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })


  console.log(type, context.dbStrategy.constructor.name) 
  console.log(await context.read())
}

// await postegresContext.create({ name: data[0].name })
// console.log(await postegresContext.read())
// await mongoDBContext.create({ name: data[1].name })
// console.log(await mongoDBContext.read())