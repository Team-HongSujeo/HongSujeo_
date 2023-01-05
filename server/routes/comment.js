const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");

// 프론트 쪽의 Comments.js에서 axios.post('/api/comment/saveComment', variables)에 맞추기 위해 /saveComment
router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

})

// 프론트 쪽의 DetailProductPage.js에서 axios.post('/api/comment/getComments', variable)에 맞추기 위해 /getComments
router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.productId }) // models/Comment.js
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});




module.exports = router;