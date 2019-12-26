module.exports = class ServerError extends Error {
  constructor (message = 'Internal server error') {
    super(message)
    this.name = 'ServerError'
  }
}
