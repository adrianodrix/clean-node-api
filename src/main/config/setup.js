const cors = require('cors')
const helmet = require('helmet')
const json = require('../middlewares/json-parser')

module.exports = app => {
  app.use(cors())
  app.use(helmet())
  app.use(json)
}
