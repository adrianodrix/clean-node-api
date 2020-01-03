const req = require('supertest')
let app

describe('Content Type Middleware', () => {
  beforeEach(() => {
    jest.resetModules()
    app = require('../config/app')
  })

  test('should return json content type as default', async () => {
    app.get('/content_type', (req, res) => {
      res.send({ message: 'content_type' })
    })

    await req(app)
      .get('/content_type')
      .expect('content-type', /json/)
  })

  test('should return error json content type as string', async () => {
    app.get('/content_type', (req, res) => {
      res.send('any_string')
    })

    const promise = req(app).get('/content_type')
    await expect(promise).rejects.toThrow()
  })
})
