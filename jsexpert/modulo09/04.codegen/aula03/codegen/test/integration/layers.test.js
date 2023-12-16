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

import { createLayerIfNotExists } from '../../src/createLayers.js'

function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromises.readdir(join(mainPath, defaultMainFolder))
}

describe('#Integration - Layers - Folders Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: [
      'service',
      'factory',
      'repository'
    ].sort()
  }

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
    
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  test('should not create folders if it exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)

    // run
    await createLayerIfNotExists(config)
    const afterRun = await getFolders(config)
    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  })

  test('should create folders if it doesnt exists', async () => {
    const beforeRun = await getFolders(config)
    await createLayerIfNotExists(config)

    const afterRun = await getFolders(config)
    expect(afterRun).toEqual(afterRun)

  })
})
