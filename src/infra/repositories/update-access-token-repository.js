const MissingParamError = require('../../utils/errors/missing-param-error')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class UpdateAccessTokenRepository {
  async update (id, accessToken) {
    if (!id) throw new MissingParamError('id')
    if (!accessToken) throw new MissingParamError('accessToken')
    this.userModel = await MongoHelper.getCollection('users')

    await this.userModel.updateOne(
      {
        _id: id
      },
      {
        $set: {
          accessToken
        }
      }
    )
  }
}
