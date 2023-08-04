const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentsSchema = new Schema({
    text: String,
    blogId: {type: Schema.Types.ObjectId, ref: 'blogs'},
    authorId: {type: Schema.Types.ObjectId, ref: 'user'},
})

module.exports = mongoose.model('comments', CommentsSchema)