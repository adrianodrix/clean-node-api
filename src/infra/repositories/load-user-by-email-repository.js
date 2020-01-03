const MissingParamError = require('../../utils/errors/missing-param-error')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) throw new MissingParamError('email')
    this.userModel = await MongoHelper.getCollection('users')

    const user = await this.userModel.findOne(
      { email },
      {
        projection: {
          password: 1
        }
      }
    )
    return user
  }
}
