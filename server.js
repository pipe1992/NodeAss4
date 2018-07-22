const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const accounts = require('./routes/accounts')

// Instantiate
const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))


// Routes

app.use('/accounts', accounts)

app.use(errorhandler())

// Initialize

app.listen(3000)