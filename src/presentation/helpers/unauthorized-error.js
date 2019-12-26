module.exports = class UnanthorizedError extends Error {
  constructor (paramName) {
    super('UnanthorizedError')
    this.name = 'UnanthorizedError'
  }
}
