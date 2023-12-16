/*
╰─ node                                                                                                                                                                                                 ─╯
Welcome to Node.js v16.16.0.
Type ".help" for more information.
> true + 2
3
> true - 2
-1
> '21' + true
'21true'
> '21' - true
20
> 9999999999999999
10000000000000000
> 0.1 + 0.2
0.30000000000000004
> 0.1 + 0.2 === 0.3
false
> 3 > 2
true
> 2 > 1
true
> 3 > 2 > 1
false
> '21' - -1
22
> '1' == 1
true
> '1' === 1
false
> 3 > 2 >= 1
true
> "B" + "a" + + "a" + "a" 
'BaNaNa'
*/ 

console.assert(String(123) === '123', "explicit convertion to string")
console.assert(123 + '' === '123', "implicit convertion to string")

console.assert(('hello' || 123) == 'hello', '|| return element truthy')

console.assert(('hello' && 123) === 123, '&& return the last element if anothers were truthy')


// ----

// --- OBJETO

const item = {
  name: 'Carlos',
  age: 34,
  // string: chama primeiro, se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: chama primeiro se nao for primitivo, chama o toString
  valueOf () {
    return 007
  }
}

console.assert(String(item) === 'Name: Carlos, Age: 34', 'Object item call toString')
console.assert(Number(item) === 007, 'Object to number call valueOf')


const item2 = {
  value: 2,
  toString() {
    return String(this.value)
  },
  valueOf() {
    return {
      value: '5'
    }
  }
}

console.assert(Number(item2) === 2, 'item2 when convert to number, call valueOf, if valueOf is a object, then call toString');

const item3 = {
  value: 2,
  toString() {
    return String(this.value)
  },
  valueOf() {
    return {
      value: '5'
    }
  },
  // tem prioridade
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '007',
      default: 0,
    }
    
    return types[coercionType]
  }
}

console.assert(Number(item3) === 7, 'call Symbol.toPrimitive when convert to Number');
console.assert(String(item3) === JSON.stringify({ value: 2 }), 'call Symbol.toPrimitive when convert to String');
console.assert(new Date(item3).toString() === 'Wed Dec 31 1969 21:00:00 GMT-0300 (Brasilia Standard Time)', 'call Symbol.toPrimitive when convert to Date, because it get convertion default it is same for boolean');

console.assert(item3 + 0 === 0, 'Convert item3 to default')
console.assert(!!item3 === true, 'Convert item3 to default when try convert to boolean')

console.assert('Ae'.concat(item3) === `Ae${JSON.stringify({value: 2})}`, 'Explicit convertion call string convertion from toPrimitive')


const item4 = {
  value: 2,
  toString() {
    return String(this.value)
  },
  valueOf() {
    return {
      value: '5'
    }
  },
  // tem prioridade
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '007',
    }
    
    return types[coercionType] || types.string
  }
}

console.assert(item4 == String(item4), 'to be true, implicity + explicit convertion')

const item5 = {...item4, name: 'Zezin', age: 20 }

// console.log('New Object',item5)
console.assert(item5.name === 'Zezin', 'should have name Zezin')