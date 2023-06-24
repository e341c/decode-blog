const express = require('express')
const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')

const app = express()

require('./server/config/db.js')
require('./server/config/passport.js')

app.use(express.static('public'))
app.use(express.urlencoded())
app.use(session({
    name: 'decodeblog.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://localhost:27017'
    })
}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')

app.use(require('./server/pages/router.js'))
app.use(require('./server/Blogs/router.js'))
app.use(require('./server/auth/router.js'))

const PORT = 8001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})