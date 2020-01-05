const { MissingParamError } = require('../../utils/errors')

module.exports = class AuthUseCase {
  constructor ({
    loadUserByEmailRepository,
    updateAccessTokenRepository,
    encrypter,
    tokenGenerator
  } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email) throw new MissingParamError('email')
    if (!password) throw new MissingParamError('password')

    const user = await this.loadUserByEmailRepository.load(email)
    if (user && (await this.encrypter.compare(password, user.password))) {
      const accessToken = await this.tokenGenerator.generate(user._id)
      await this.updateAccessTokenRepository.update(user._id, accessToken)
      return accessToken
    }
    return null
  }
}
