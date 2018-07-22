const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db', { useNewUrlParser: true })

const accountSchema = mongoose.Schema({
    name: String,
    balance: Number
})

const Account = mongoose.model('Account', accountSchema)

getAccounts = (req, res) => {
    Account.find({}, (err, response) => {
        if(err) return res.status(400).send(err)
        res.status(200).send(response)
    })
}

addAccount = (req, res) => {
    if(!req.body.name || !req.body.balance) return res.status(400).send("Fields incomplete")
    const newAccount = new Account({name: req.body.name, balance: req.body.balance})
    newAccount.save((err, response) => {
        if(err) return res.status(400).send(err)
        res.status(201).send(response)
    })
}

putAccount = (req, res) => {
    if(!req.params.id) return res.status(400).send("Id is requiered")
    Account.findById(req.params.id, (err, account) => {
        if(err) return res.status(400).send(err)
        account.name = req.body.name ? req.body.name : account.name
        account.balance = req.body.balance ? req.body.balance : account.balance
        account.save((err, response) => {
            if(err) return res.status(400).send(err)
            res.status(200).send(response)
        })
    })
}

removeAccount = (req, res) => {
    if(!req.params.id) return res.status(400).send("Id is requiered")
    Account.findById(req.params.id, (err, account) => {
        if(err) return res.status(400).send(err)
        account.remove((err, response) => {
            if(err) return res.status(400).send(err)
            res.status(200).send(response)
        })
    })
}

// Routes

router.get('/', getAccounts)
router.post('/', addAccount)
router.put('/:id', putAccount)
router.delete('/:id', removeAccount)

module.exports = router