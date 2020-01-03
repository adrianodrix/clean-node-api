const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
const MissingParamError = require('../../utils/errors/missing-param-error')
let userModel

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

const makeFakeUser = async () => {
  const fakeUser = await userModel.insertOne({
    email: 'any_email@mail.com',
    name: 'any_name',
    password: 'hashed_password'
  })

  return fakeUser
}

describe('Update Access Token Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  test('should update the user with the giver AccessToken', async () => {
    const sut = makeSut()
    const fakeUser = await makeFakeUser()

    await sut.update(fakeUser.ops[0]._id, 'valid_token')
    const updatedFakeUser = await userModel.findOne({
      _id: fakeUser.ops[0]._id
    })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('should throw if no params are provided', async () => {
    const sut = await makeSut()
    const fakeUser = await makeFakeUser()

    await expect(sut.update(null, 'valid_token')).rejects.toThrow(
      new MissingParamError('id')
    )
    await expect(sut.update(fakeUser.ops[0]._id, null)).rejects.toThrow(
      new MissingParamError('accessToken')
    )
  })
})
