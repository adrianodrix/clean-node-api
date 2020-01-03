const app = require('./config/app')

app.get('/', (req, res) => res.send('hello world'))

app.listen(3333, () => console.log('Server Running'))
