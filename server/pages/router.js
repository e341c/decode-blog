const express = require('express')
const router = express.Router()
const Blogs = require('../Blogs/Blogs.js')


router.get('/', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('blogs.ejs', {
        blogs: allBlogs,
        user: req.user ? req.user: {}
    })
})

router.get('/login', async(req, res) => {
    res.render('login.ejs', {user: req.user ? req.user: {}})
})

router.get('/register', (req, res) => {
    res.render('register.ejs', {user: req.user ? req.user: {}})
})

router.get('/profile/:id', async(req, res) => {
    res.render('profile.ejs', {
        user: req.user ? req.user: {}
    })
})

router.get('/new', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('newBlog.ejs', {
        blogs: allBlogs,
        user: req.user ? req.user: {}
    })
})

router.get('/edit', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('editBlog.ejs', {
        blogs: allBlogs,
        user: req.user ? req.user: {}
    })
})

router.get('/comments', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('comments.ejs', {
        blogs: allBlogs,
        user: req.user ? req.user: {}
    })
})

module.exports = router