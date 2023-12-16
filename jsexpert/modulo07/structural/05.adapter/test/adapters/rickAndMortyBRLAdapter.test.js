import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import axios from 'axios';
import Character from '../../src/entities/character.js';
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL.js';
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter.js';


describe('#RickAndMortyBRLAdapter', () => {
  beforeEach(() => jest.clearAllMocks())
  test('#getCharacters shoud be an adapter for RickAndMortyBRL.getCharactersJSON', async () => {
    const brlIntegration = jest.spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name).mockResolvedValue([])

    const result = await RickAndMortyBRLAdapter.getCharacters()
    expect(result).toEqual([])

    expect(brlIntegration).toHaveBeenCalledTimes(1)
  })
})