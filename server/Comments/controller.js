const Comment = require('./Comments')

const createComment = async (req, res) => {
    if (req.body.text.length > 0 &&
        req.user._id.length > 0) {
        await new Comment({
            text: req.body.text,
            blogId: req.params.id,
            authorId: req.user._id,
        }).save()
        res.redirect(`/`)
    } else {
        res.redirect(`/?error=1`)
    }
}

module.exports = {createComment}