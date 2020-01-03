const loginRouter = require('../composers/login-router-composer')
const RouterAdapter = require('../adapters/express-router-adapter')

module.exports = async router => {
  router.post('/login', RouterAdapter.adapt(loginRouter))
}
