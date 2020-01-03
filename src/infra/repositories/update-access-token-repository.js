const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (id, accessToken) {
    if (!id) throw new MissingParamError('id')
    if (!accessToken) throw new MissingParamError('accessToken')

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
