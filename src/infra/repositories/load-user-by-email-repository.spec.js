const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

const makeSut = async db => {
  const userModel = await db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)

  return {
    sut,
    userModel
  }
}
describe('LoadUserByEmail Repository', () => {
  let connection, db

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
    const { sut } = await makeSut(db)
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('should return an user if user is found', async () => {
    const { sut, userModel } = await makeSut(db)
    const email = 'valid_email@mail.com'

    await userModel.insertOne({
      email
    })

    const user = await sut.load(email)
    expect(user.email).toBe(email)
  })
})
