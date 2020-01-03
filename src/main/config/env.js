module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-code',
  port: process.env.PORT || 3333,
  tokenSecret: process.env.TOKEN_SECRET || 'secret'
}
