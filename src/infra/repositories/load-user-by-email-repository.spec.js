const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
let userModel

const makeSut = async () => {
  return new LoadUserByEmailRepository(userModel)
}
describe('LoadUserByEmail Repository', () => {
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

  test('should return null if no user is found', async () => {
    const sut = await makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('should return an user if user is found', async () => {
    const sut = await makeSut()
    const email = 'valid_email@mail.com'

    const fakeUser = await userModel.insertOne({
      email,
      name: 'any_name',
      password: 'hashed_password'
    })

    const user = await sut.load(email)
    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      password: fakeUser.ops[0].password
    })
  })

  test('should trhow if no UserModel is provided', async () => {
    const sut = new LoadUserByEmailRepository()
    const promise = sut.load('invalid_email@mail.com')
    await expect(promise).rejects.toThrow()
  })
})
