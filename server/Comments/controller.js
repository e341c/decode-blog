const Comment = require('./Comments')

const createComment = async (req, res) => {
    if (1 == 1) {
        console.log('test1');
        await new Comment({
            text: req.body.text,
            blogId: req.params.id,
            authorId: req.user._id,
        }).save()
        res.redirect(`/`)
    } else {
        res.redirect('/new?error=1')
    }
}

module.exports = {createComment}