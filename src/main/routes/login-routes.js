const loginRouter = require('../composers/login-router-composer')

module.exports = async router => {
  router.post('/login', loginRouter)

  router.get('/', (req, res) => {
    res.json({ message: 'Hi' })
  })
}
