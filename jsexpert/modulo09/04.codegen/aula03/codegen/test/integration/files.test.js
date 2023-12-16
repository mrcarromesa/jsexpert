import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll
} from '@jest/globals'

import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'


import { createLayerIfNotExists } from './../../src/createLayers.js'
import { createFiles } from './../../src/createFiles.js';
import Util from '../../src/util.js'

function getAllFunctionsFromInstance(instance) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance))
    .filter(method => method !== 'constructor')
}


function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
  return layers.map(layer => {
    const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
    return join(mainPath, defaultMainFolder, layer, fileName)
  })
}



describe('#Integration - Files - Files Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: [
      'service',
      'factory',
      'repository'
    ].sort(),
    componentName: 'heroes'
  }
  
  const packageJSON = 'package.json'
  const packageJSONLocation = join('./test/integration/mocks/',packageJSON)
  
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
    await fsPromises.copyFile(packageJSONLocation, join(config.mainPath, packageJSON))
    await createLayerIfNotExists(config)
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  test('Repository class should have create, read, update and delete methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository']
    }

    await createFiles(myConfig)
    const [ repositoryFile ] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const instance = new Repository()
    
    const expectedNotImplemented = fn => expect(() => fn.call()).rejects.toEqual("method not implemented!")

    expectedNotImplemented(instance.create)
    expectedNotImplemented(instance.read)
    expectedNotImplemented(instance.update)
    expectedNotImplemented(instance.delete)

  })
  test('Service class should have the same signature of repository and call all its methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository', 'service']
    }

    await createFiles(myConfig)
    const [ repositoryFile, serviceFile ] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)

    const repository = new Repository()
    const service = new Service({ repository })

    const allRepositoryMethods = getAllFunctionsFromInstance(repository)
    
    allRepositoryMethods
        .forEach(method => jest.spyOn(repository, method).mockResolvedValue())
    
    // executa todos os methods de service
    getAllFunctionsFromInstance(service)
        .forEach(method => service[method].call(service, []))

  
    allRepositoryMethods
        .forEach(method => expect(repository[method]).toHaveBeenCalled())
  })
  test('Factory instance should match layers', async () => {
    const myConfig = {
      ...config
    }

    await createFiles(myConfig)
    // colocamos em ordem pois rodamos o sor no layers
    const [ factoryFile, repositoryFile, serviceFile ] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)
    const { default: Factory } = await import(factoryFile)

    const expectedInstance = new Service({ repository: new Repository() })
    const instance = Factory.getInstance()

    expect(instance).toMatchObject(expectedInstance)
    expect(instance).toBeInstanceOf(Service)

  })
})
