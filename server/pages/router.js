const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const Blogs = require('../Blogs/Blogs.js')


router.get('/', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('blogs.ejs', {blogs: allBlogs})
})

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.get('/profile', (req, res) => {
    res.render('profile.ejs')
})

router.get('/new', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('newBlog.ejs', {blogs: allBlogs})
})

router.get('/edit', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('editBlog.ejs', {blogs: allBlogs})
})

router.get('/comments', async(req, res) => {
    const allBlogs = await Blogs.find()
    res.render('comments.ejs', {blogs: allBlogs})
})

module.exports = router