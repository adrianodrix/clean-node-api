jest.mock('bcrypt', () => ({
  isValid: true,
  async compare (value, hash) {
    this.value = value
    this.hash = hash

    return this.isValid
  }
}))

const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')
const Encrypter = require('./encrypter')

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  test('should return false if bcrypt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false

    const isValid = await sut.compare('invalid_value', 'hashed_value')
    expect(isValid).toBe(false)
  })

  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    bcrypt.isValid = false

    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hashed_value')
  })

  test('should trhow if not params are provided', async () => {
    const sut = makeSut()
    await expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
    await expect(sut.compare('any_value')).rejects.toThrow(
      new MissingParamError('hash')
    )
  })
})
