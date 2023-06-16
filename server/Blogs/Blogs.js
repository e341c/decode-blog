const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    name: String,
    key: Number
})

module.exports = mongoose.model('blogs', BlogSchema)