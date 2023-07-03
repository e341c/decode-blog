const express = require('express')
const router = express.Router()

const {upload} = require('./multer')
const {getAllBlogs} = require('./controller')
const {createBlog} = require('./controller')
const {isAuth} = require('../auth/middlewares')


router.post('/api/blogs', getAllBlogs)
router.post('/api/new', isAuth,  upload.single('img'), createBlog)

module.exports = router

