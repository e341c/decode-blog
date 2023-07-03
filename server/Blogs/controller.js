const Blogs = require('./Blogs')

const getAllBlogs = async(req, res) => {
    const data = await Blogs.find()
    res.send({data})
}

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
    // res.send('ok')
}


module.exports = {getAllBlogs, createBlog}