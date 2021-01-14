const express = require('express')
const app = express()
require('./db/connection')
const userRouter = require('./routes/user')
const jobRouter = require('./routes/job')

app.use(express.json()) // to convert in json

app.use(jobRouter)
app.use(userRouter)
app.use(express.static('static'))
app.listen(4444, () => {
    console.log('server started')
})