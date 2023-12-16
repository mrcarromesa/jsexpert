// para importar do diretorio use o comando abaixo
// node --experimental-specifier-resolution=node
// import FluentSQLBuilder from "./../fluentsql-jest-tdd-yt";
import FluentSQLBuilder from "@mrcarromesa/fluentsql";

import database from './database/data.json' assert { type: 'json' }

const result = FluentSQLBuilder.for(database)
                              .where({ registered: /^(2020|2019)/ })
                              .select(['name'])
                              .limit(3)
                              .countBy('name')
                              .build()

console.log(result)