const express = require('express')
const bodyParser = require('body-parser') 
const App = express()
const fs = require('fs')
const path = require('path')
const console = require('console')

App.use(express.static(path.join(__dirname, 'public')))

App.use(bodyParser.urlencoded({ extended: true}))

App.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'))
})

App.post('/', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    fs.readFile('User.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        const userData = JSON.parse(data)
    if(userData.email == email && userData.password == password){
        res.end(`<h1 style="color:blue">Data matches</h1>`)
    }
    else{
        res.end(`<h1 style="color:blue">Data doesn't match</h1>`)
    }
    })
})


App.listen(3000, (err) => {
    if (err) throw err;
    console.log("Successfully connected to 3000")
})

