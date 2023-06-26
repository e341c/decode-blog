const express = require('express')
const router = express.Router()
const {getAllBlogs} = require('./controller')

router.post('api/blogs', getAllBlogs)

module.exports = router

