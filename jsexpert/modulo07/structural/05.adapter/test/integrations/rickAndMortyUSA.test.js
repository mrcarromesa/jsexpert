import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import Character from '../../src/entities/character.js';
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA';
import axios from 'axios';


describe('#RickAndMortyUSA', () => {
  beforeEach(() => jest.clearAllMocks())
  test('#getCharactersXML should return a list of Character Entity', async () => {
    const response = await fs.readFile('./test/mocks/characters.xml')
    const expected = [{"gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "state": undefined, "type": "Superhuman (Ghost trains summoner)"}]

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })
    
    const result = await RickAndMortyUSA.getCharactersFromXML()
    // verifica a equidade independente da instancia
    expect(result).toMatchObject(expected)
  })
  test('#getCharactersXML should return a empty list if the API returns nothing', async () => {
    const response = await fs.readFile('./test/mocks/characters-empty.xml')
    const expected = []
    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })
    const result = await RickAndMortyUSA.getCharactersFromXML()
    expect(result).toStrictEqual(expected)
  })
})