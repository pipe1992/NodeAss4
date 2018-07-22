const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const accounts = require('./routes/accounts')

// Instantiate
const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

// Routes

app.use('/accounts', accounts)

// Initialize

app.listen(3000)