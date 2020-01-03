const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
let userModel

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
    const fakeUser = await userModel.insertOne({
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'hashed_password'
    })

    const sut = new UpdateAccessTokenRepository(userModel)
    await sut.update(fakeUser.ops[0]._id, 'valid_token')
    const updatedFakeUser = await userModel.findOne({
      _id: fakeUser.ops[0]._id
    })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })
})
