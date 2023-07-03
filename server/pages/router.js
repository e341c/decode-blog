const express = require('express')
const router = express.Router()
const Blogs = require('../Blogs/Blogs.js')
const Categories = require('../Categories/Categories.js')

require('../Blogs/router.js')

router.get('/', async(req, res) => {
    const allBlogs = await Blogs.find().populate('categories', 'name').populate('author' )
    const allCategories = await Categories.find()
    res.render('blogs.ejs', {
        blogs: allBlogs,
        categories: allCategories,
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
    const allCategories = await Categories.find()
    res.render('newBlog.ejs', {
        categories: allCategories,
        user: req.user ? req.user: {}
    })
})

router.get('/edit', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('editBlog.ejs', {
        blogs: allBlogs,
        categories: allCategories,
        user: req.user ? req.user: {}
    })
})

router.get('/comments', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('comments.ejs', {
        blogs: allBlogs,
        categories: allCategories,
        user: req.user ? req.user: {}
    })
})

module.exports = router