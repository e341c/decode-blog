const express = require('express')
const router = express.Router()
const {getAllBlogs} = require('./controller')
const writeDataBlog = require('./seed')

router.get('api/blogs', getAllBlogs)

writeDataBlog()

module.exports = router

