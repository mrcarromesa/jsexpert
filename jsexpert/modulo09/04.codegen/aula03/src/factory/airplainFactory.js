
import AirplainService from '../service/airplainService.js'
import AirplainRepository from '../repository/airplainRepository.js'

export default class AirplainFactory {
  static getInstance() {
    const repository = new AirplainRepository()
    const service = new AirplainService({ repository })
    return service
  }
}