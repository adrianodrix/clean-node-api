const app = require('./app')
const req = require('supertest')

describe('App Setup', () => {
  test('should add helmet header', async () => {
    app.get('/test_x_powere_by', (req, res) => {
      res.send('test_x_powere_by')
    })

    const res = await req(app).get('/test_x_powere_by')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  test('should add cors header', async () => {
    app.get('/origin', (req, res) => {
      res.send('origin')
    })

    const res = await req(app).get('/origin')
    expect(res.headers['access-control-allow-origin']).toBe('*')
  })
})
