import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import BaseBusiness from '../src/business/base/baseBusiness';
import { NotImplementedException } from '../src/util/exceptions';


describe('#BaseBusiness', () => {

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('should throw an error when child class doesnt implement _validateRequiredFields function', () => {
    class ConcreteClass extends BaseBusiness { }
    const concreteClass = new ConcreteClass()
    const validatorError = new NotImplementedException(
      concreteClass._validateRequiredFields.name
    )

    expect(() => concreteClass.create({})).toThrow(validatorError)
  })
  test('should throw an error when _validateRequiredFields returns false', () => {
    const VALIDATION_DOESNT_SUCCEEDED = false;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEEDED)
     }
    const concreteClass = new ConcreteClass()
    const validatorError = new Error('invalid data!')

    expect(() => concreteClass.create({})).toThrow(validatorError)
  })
  test('should throw an error when child class doesnt implement _create function', () => {
    const VALIDATION_SUCCEEDED = true;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
    }

    const concreteClass = new ConcreteClass()
    const validatorError = new NotImplementedException(
      concreteClass._create.name
    )

    expect(() => concreteClass.create({})).toThrow(validatorError)
  })

  test('should call _create and _validateRequiredFields on create', () => {
    const VALIDATION_SUCCEEDED = true;
    const CREATE_SUCCEED = true;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
      _create = jest.fn().mockReturnValue(CREATE_SUCCEED)
    }

    const concreteClass = new ConcreteClass()
    
    const createFromBaseClass = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    )

    const result = concreteClass.create({})

    expect(result).toBeTruthy()
    expect(createFromBaseClass).toHaveBeenCalledTimes(1)
    expect(concreteClass._create).toHaveBeenCalledTimes(1)
    expect(concreteClass._validateRequiredFields).toHaveBeenCalledTimes(1)
  })
})