const Blogs = require('./Blogs')

const getAllBlogs = async(req, res) => {
    const data = await Blogs.find()
    res.send({data})
}

module.exports = {getAllBlogs}