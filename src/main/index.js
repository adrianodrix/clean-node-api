const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
app.use(cors())
app.use(helmet())

app.listen(3333, () => console.log('Server Running'))
