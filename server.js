const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('./server/config/db.js')

app.use(express.static('public'))
app.use(express.urlencoded())

app.set('view engine', 'ejs')

app.use(require('./server/pages/router.js'))
app.use(require('./server/Blogs/router.js'))
app.use(require('./server/auth/router.js'))

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})