const validator = require('validator')
const EmailValidator = require('./email-validator')
const MissingParamError = require('./errors/missing-param-error')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validatgor', () => {
  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('should return false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('should call validator with corret email', () => {
    const sut = makeSut()
    const email = 'any_email@mail.com'
    sut.isValid(email)
    expect(validator.email).toBe(email)
  })

  test('should trhow if not email is provided', async () => {
    const sut = makeSut()
    expect(sut.isValid).toThrow(new MissingParamError('email'))
  })
})
