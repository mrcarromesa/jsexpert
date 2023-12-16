
export default class AirplainService {
  constructor({ repository: airplainRepository }) {
    this.airplainRepository = airplainRepository
  }

  create(data){
    return this.airplainRepository.create(data)
  }
  
  read(query){
    return this.airplainRepository.read(query)
  }
  
  update(id, data){
    return this.airplainRepository.update(id, data)
  }
  
  delete(id){
    return this.airplainRepository.delete(id)
  }
}