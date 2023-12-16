const { describe, it, before, beforeEach, afterEach } = require('mocha')
// const assert = require('assert')
const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')

const CarService = require('./../../src/services/carService')

const carsDatabase = join(__dirname, './../../database', 'cars.json')


const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json')
}

describe('CarService Suite Test', () => {
  let carService = {}
  let sandbox = {}

  before(() => {
    carService = new CarService({
      cars: carsDatabase
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory

    const carIdIndex = 0

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name // assim ele retorna o nome dessa funcao.. poderia ser uma string mas assim fica mais senior...
    ).returns(carIdIndex)

    const result = carService.chooseRandomCar(carCategory)

    const expected = carCategory.carIds[carIdIndex]

    expect(result).to.be.equal(expected)
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok

  })

  it('given a carCategory it should return an available car', async () => {

    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )


    const result = await carService.getAvailableCar(carCategory)

    const expected = car
    expect(result).to.be.deep.equal(expected)
    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok

  })
})