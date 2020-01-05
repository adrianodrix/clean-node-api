const MongoHelper = require('../infra/helpers/mongo-helper')
const bcrypt = require('bcrypt')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const userModel = await MongoHelper.getCollection('users')
    const user = await userModel.findOne({
      email: 'adrianodrix@gmail.com'
    })
    if (!user) {
      await userModel.insertOne({
        email: 'adrianodrix@gmail.com',
        password: bcrypt.hashSync('123456', 10)
      })
    }

    const app = require('./config/app')
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    )
  })
  .catch(console.error)
