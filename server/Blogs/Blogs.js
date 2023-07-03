const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    name: String,
    categories: {type: Schema.Types.ObjectId, ref: 'categories'},
    img: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
})

module.exports = mongoose.model('blogs', BlogSchema)