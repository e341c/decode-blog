const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('blogs.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})