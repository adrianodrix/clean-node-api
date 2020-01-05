const req = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')
let userModel

describe('Login Routes', () => {
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

  test('should return 200 when valid credentials are provided', async () => {
    const email = 'valid_email@gmail.com'
    const password = 'any_password'

    await userModel.insertOne({
      email,
      password: bcrypt.hashSync(password, 10),
      name: 'any_name'
    })

    await req(app)
      .post('/api/login')
      .send({
        email,
        password
      })
      .expect(200)
  })

  test('should return 401 when invalid credentials are provided', async () => {
    const email = 'invalid_email@gmail.com'
    const password = 'any_password'

    await req(app)
      .post('/api/login')
      .send({
        email,
        password
      })
      .expect(401)
  })
})
