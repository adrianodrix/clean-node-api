const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let connection, db

const makeSut = async () => {
  const userModel = await db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)

  return {
    sut,
    userModel
  }
}
describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany({})
  })

  test('should return null if no user is found', async () => {
    const { sut } = await makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('should return an user if user is found', async () => {
    const { sut, userModel } = await makeSut()
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
})
