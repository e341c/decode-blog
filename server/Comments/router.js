const express = require('express')
const router = express.Router()

const {createComment} = require('./controller')
const {isAuth} = require('../auth/middlewares')

router.post('/api/comments/new', createComment)

module.exports = router