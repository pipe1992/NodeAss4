# Node - Assigment 4 - Mongoose
## Felipe Estrada

### 1. Project design

I created a server.js file which would import the midleware and the accounts router and start the aplication, then i created a routes folder which has the accounts schema and model, and the CRUD logic divided into 4 methods:

For the get i used the Model.Find() with out filter parameter to ensure all the accounts would be answered
```
getAccounts = (req, res) => {
    Account.find({}, (err, response) => {
        if(err) return res.status(400).send(err)
        res.status(200).send(response)
    })
}
```

For the post i used the Model.save() after checking all the information was recived and creating a new model object

```
addAccount = (req, res) => {
    if(!req.body.name || !req.body.balance) return res.status(400).send("Fields incomplete")
    const newAccount = new Account({name: req.body.name, balance: req.body.balance})
    newAccount.save((err, response) => {
        if(err) return res.status(400).send(err)
        res.status(201).send(response)
    })
}
```

For the put i used the Model.FindByID() to locate the expected account and the with inline if-else checked if new values had arrived and updated the record accordingly, then using save to update the account

```
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
```
For delete i used Model.findByID() and then removed the account

```
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
```

### 2. Tests

I executed the suggested validation curls and a few more, but this should be enough to validate it is working correctly

//posts account data

curl -H "Content-Type: application/json" -X POST -d '{"balance": "1000", "name": "savings"}' "http://localhost:3000/accounts"

//gets account data

curl "http://localhost:3000/accounts"

//updates account data at specific id, NOTE: replace 'id' in "http://localhost:3000/accounts/id" with the id generated by the previous POST command

curl -H "Content-Type: application/json" -X PUT -d '{"balance": "1500"}' "http://localhost:3000/accounts/id"

//deletes account data at specific id, NOTE: replace 'id' in "http://localhost:3000/accounts/id" with the id generated by the previous POST command

curl -X DELETE "http://localhost:3000/accounts/id"


### 3. Working

The project is working as intended