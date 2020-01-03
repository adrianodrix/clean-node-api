const app = require('../config/app')
const req = require('supertest')

describe('JSON Parser Middlware', () => {
  test('should parse body as JSON', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    })

    await req(app)
      .post('/test_json_parser')
      .send({
        name: 'test'
      })
      .expect({
        name: 'test'
      })
  })
})
