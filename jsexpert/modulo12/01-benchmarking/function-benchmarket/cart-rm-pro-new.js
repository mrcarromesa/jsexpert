import Product from "../src/entities/product.js"

export default class Cart {
  constructor({ at, products }) {
    this.products = this.removedUndefinedProps(products)
  }

  removedUndefinedProps(products) {
    const result = []

    for(const product of products) {
      const keys = Reflect.ownKeys(product)

      if(!keys.length) continue;
      // 2.
      // keys.forEach(key => product[key] || delete product[key])
      
      // keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
      
      // 3.
      let newObject = {}
      keys.forEach(key => {
        if(!keys[key]) return;

        newObject[key] = keys[key]
      })

      result.push(new Product(product))

      
      // 1.
      // result.push(JSON.parse(JSON.stringify(new Product(product))))
    }

    return result
  }
  
}
