export default class Character {
  constructor({ id, name, state, species, type, gender, origin, location }) {
    this.id = Number(id) 
    this.name = name 
    this.state = state 
    this.species = species 
    this.type = type 
    this.gender = gender 
    this.origin = origin?.name
    this.location = location?.name
  }
}