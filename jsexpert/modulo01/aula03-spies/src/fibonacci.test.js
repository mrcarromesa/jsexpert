const sinon = require('sinon')
const assert = require('assert')
const Fibonacci = require('./fibonacci')

;(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // generators retornam interators, os quais percisa ser interado com (.next)
    // existem 3 formas de ler os dados 
    // usando funções .next, for await e rest/spread
    for await (const i of fibonacci.execute(3)) {}
    const expectCallCount = 4
    assert.deepStrictEqual(spy.callCount, expectCallCount)
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // rest/spread
    const [...result] = fibonacci.execute(5)
    // [0] => input = 5, current = 0, input = 1
    // [1] => input = 4, current = 1, input = 1
    // [2] => input = 3, current = 1, input = 2
    // [3] => input = 2, current = 2, input = 3
    // [4] => input = 1, current = 3, input = 5
    // [5] => input = 0 -> STOP

    const {args} = spy.getCall(2)
    const expectedResult = [0, 1, 1, 2, 3];

    // conforme chamada [2]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    });

    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(result, expectedResult)
  }
})()