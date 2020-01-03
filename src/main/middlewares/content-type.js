module.exports = (req, res, next) => {
  res.type('json')
  return next()
}
