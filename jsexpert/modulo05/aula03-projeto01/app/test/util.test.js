const { describe, it } = require('mocha')
const { expect } = require('chai')
const { evaluateRegex, InvalidRegexError } = require('./../src/util')

describe('Util', () => {
  it('#evaluateRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /ˆ([a-z|A-Z|0-9]+\s?)+$/

    /*
    // fica rodando em loop e quebra tudo!
    // catastrophic backtracking!
    // Isso se dá devido ao mais, que faz com que ele fique em loop..
    time \
    node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaaae man como vai voce e como vai voce e como vai voce?') && console.log('legal')"
    */

    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })

  it('#evaluateRegex should not throw an error using a safe regex', () => {
    const safeRegex = /ˆ([a-z])$/

    expect(() => evaluateRegex(safeRegex)).to.not.throw
    expect(evaluateRegex(safeRegex)).to.be.ok
  })
  
})