const Blogs = require('./Blogs')
const fs = require('fs')
const path = require('path')

const createBlog = async(req, res) => {
    if(req.file && 
        req.body.name.length > 2 && 
        req.body.categories.length > 2 && 
        req.body.description.length > 2){
        await new Blogs({
            name: req.body.name,
            categories: req.body.categories,
            description: req.body.description,
            img: `/img/blogs/${req.file.filename}`,
            author: req.user._id
        }).save()
        res.redirect(`/profile/${req.user._id}`)
    }else{
        res.redirect('/new?error=1')
    }
}

const editBlog = async(req, res) => {
    if(req.file && 
        req.body.name.length > 2 && 
        req.body.categories.length > 2 && 
        req.body.description.length > 2){
            const blog = await Blogs.findById(req.body.id)
            fs.unlinkSync(path.join(__dirname + '../../../public' + blog.img))
            await Blogs.findByIdAndUpdate(req.body.id, {
                name : req.body.name,
                categories : req.body.categories,
                description : req.body.description,
                img : `/img/blogs/${req.file.filename}`,
                author: req.user._id,
            })
            res.redirect('/profile/' + req.user._id)
    }else{
        res.redirect(`/edit/${req.body.id}?error=1`)
    }
}

const deleteFilm = async(req, res) => {
    const blog = await Blogs.findById(req.params.id)
    if(blog){
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.img))
        await Blogs.deleteOne({_id : req.params.id})
        res.status(200).send('Ok')
    }else{
        res.status(404).send('Not found')
    }
}


module.exports = {createBlog , editBlog, deleteFilm}