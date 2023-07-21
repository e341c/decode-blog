const express = require('express')
const router = express.Router()
const Blogs = require('../Blogs/Blogs.js')
const Categories = require('../Categories/Categories.js')
const User = require('../auth/User.js')

require('../Blogs/router.js')

router.get('/', async(req, res) => {
    const options = {}
    const category = await Categories.findOne({key : req.query.categories})
    if(category){
        options.categories = category._id
    }
    
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    } 
    const totalBlogs = await Blogs.count()

    const allCategories = await Categories.find()
    const allBlogs = await Blogs.find(options).limit(limit).skip(page).populate('categories').populate('author' )
    res.render('blogs.ejs', {
        blogs: allBlogs,
        categories: allCategories,
        user: req.user ? req.user: {},
        pages : Math.ceil(totalBlogs / limit)
    })
})

router.get('/login', async(req, res) => {
    res.render('login.ejs', {user: req.user ? req.user: {}})
})

router.get('/register', (req, res) => {
    res.render('register.ejs', {user: req.user ? req.user: {}})
})

router.get('/profile/:id', async(req, res) => {
    const profileUser = req.params.id
    const allBlogs = await Blogs.find({author: profileUser}).populate('categories').populate('author')
    const allCategories = await Categories.find()
    res.render('profile.ejs', {
        blogs: allBlogs,
        categories: allCategories,
        user: req.user ? req.user: {},
        profileUser
    })
})

router.get('/new', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('newBlog.ejs', {
        categories: allCategories,
        user: req.user ? req.user: {}
    })
})

router.get('/edit/:id', async(req, res) => {
    const allBlogs = await Blogs.findById(req.params.id)
    const allCategories = await Categories.find()
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

router.get('/detail/:id', async(req, res) => {
    const allBlogs = await Blogs.findById(req.params.id).populate('categories').populate('author')
    const allCategories = await Categories.find()
    res.render('detailBlog.ejs', {
        blogs: allBlogs,
        categories: allCategories,
        user: req.user ? req.user: {},
    })
})

module.exports = router