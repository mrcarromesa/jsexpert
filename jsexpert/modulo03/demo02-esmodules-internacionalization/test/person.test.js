import { describe, it } from 'mocha'
import { expect } from 'chai'
import Person from './../src/person.js'

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Carro 20000 2020-01-01 2020-02-01'
    )

    const expected = {
      from: '2020-01-01',
      to: '2020-02-01',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: "20000",
      id: "1"
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format value', () => {
    const person = new Person({
      from: '2020-01-01',
      to: '2020-02-01',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: "20000",
      id: "1"
    })
    const result = person.formatted("pt-BR")

    const expected = {
      from: "01 de janeiro de 2020",
      id: 1,
      kmTraveled: "20.000 km",
      to: "01 de fevereiro de 2020",
      vehicles: "Bike e Carro",
    }

    expect(result).to.be.deep.equal(expected)
  })
})