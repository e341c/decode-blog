const express = require('express')
const router = express.Router()
const Blogs = require('../Blogs/Blogs.js')
const Categories = require('../Categories/Categories.js')
const User = require('../auth/User.js')
const Comments = require('../Comments/Comments.js')

require('../Blogs/router.js')

router.get('/', async(req, res) => {
    const options = {}
    const category = await Categories.findOne({key : req.query.categories})
    if(category){
        options.categories = category._id
        res.locals.category = req.query.categories
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                name: new RegExp(req.query.search , 'i')
            },
            {
                description: new RegExp(req.query.search , 'i')
            }
        ]
        res.locals.search = req.query.search
    }

    const totalBlogs = await Blogs.count(options)
    const allCategories = await Categories.find()
    const allBlogs = await Blogs.find(options).limit(limit).skip(page * limit).populate('categories').populate('author')
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

router.get('/detail/:id', async(req, res) => {
    const allBlogs = await Blogs.findById(req.params.id).populate('categories').populate('author')
    const allCategories = await Categories.find()
    const allComments = await Comments.find().populate('authorId')
    res.render('detailBlog.ejs', {
        blogs: allBlogs,
        categories: allCategories,
        comments: allComments,
        user: req.user ? req.user: {},
    })
})

module.exports = router