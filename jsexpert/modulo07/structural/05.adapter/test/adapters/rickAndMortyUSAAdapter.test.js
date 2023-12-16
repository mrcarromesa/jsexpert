import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import axios from 'axios';
import Character from '../../src/entities/character.js';
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA.js';
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter.js';


describe('#RickAndMortyUSAAdapter', () => {
  beforeEach(() => jest.clearAllMocks())
  test('#getCharacters shoud be an adapter for RickAndMortyUSA.getCharactersXML', async () => {
    const brlIntegration = jest.spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name).mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharacters()
    expect(result).toEqual([])

    expect(brlIntegration).toHaveBeenCalledTimes(1)
  })
})