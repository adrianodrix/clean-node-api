module.exports = class UnanthorizedError extends Error {
  constructor (paramName) {
    super('unanthorized access')
    this.name = 'UnanthorizedError'
  }
}
