const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    name: String,
    categories: String,
    img: String,
    description: String,
})

module.exports = mongoose.model('blogs', BlogSchema)