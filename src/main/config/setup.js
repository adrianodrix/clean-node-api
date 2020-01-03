const cors = require('cors')
const helmet = require('helmet')
const json = require('../middlewares/json-parser')
const contentType = require('../middlewares/content-type')

module.exports = app => {
  app.use(cors())
  app.use(helmet())
  app.use(json)
  app.use(contentType)
}
