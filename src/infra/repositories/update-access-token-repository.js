module.exports = class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (id, accessToken) {
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
