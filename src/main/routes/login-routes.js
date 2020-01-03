module.exports = router => {
  router.post('/login', (req, res) => {
    res.json({ message: 'login' })
  })

  router.get('/', (req, res) => {
    res.json({ message: 'Hi' })
  })
}
