const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})