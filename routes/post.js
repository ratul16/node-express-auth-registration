const router = require('express').Router();
const postSchema = require('../models/Post');
const verify = require('./tokenVerify');

// Post Route

router.get('/', verify, async (req, res) => {
    try {
        const posts = await postSchema.find();
        res.send(posts);
    } catch (err) {
        res.send({ message: err });
    }
});


router.post('/', verify, async (req, res) => {

    const post = new postSchema({
        userId: req.body.userId,
        id: req.body.id,
        title: req.body.title,
        body: req.body.body
    });
    try {
        const SavePosts = await post.save();
        res.send({
            statusCode: 201,
            message: "New post added successfully !!"
        });
    } catch (err) {
        res.send({ message: err });
    }
});


module.exports = router;