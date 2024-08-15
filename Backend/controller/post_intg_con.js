const Post = require("../models/Postdata_Model")
// const {io} = require("../server")
const socket = require("./socketImplement")


const likepost = async (req, res) => {
    const id = req.params.id
    const ownerid = req.userId
    // console.log(ownerid)
    try {
        const likeobj = {
            likeuserId: ownerid
        }
        const likechange = await Post.findById(id);
        let a = likechange.like.filter((ele) => {
            return ele.likeuserId == ownerid
        });

        if (a.length == 0) {
            likechange.like.unshift(likeobj);
            await likechange.save();
            res.status(200).json({ message: "post like" })
        } else {
            likechange.like = likechange.like.filter(ele => ele.likeuserId != ownerid)
            await likechange.save()
            res.status(200).json({ message: "post unlike" });
        }
    }
    catch (err) {
        console.log(err, "something wrong in like fun")
        res.status(500).json(err)
    }
}
const commentcreate = async (req, res) => {
    try {
        const postId = req.params.id;
        const ownerid = req.userId;
        const message = req.body.message;
        if (message == "") {
            res.status(400).json("enter comment")
        }
        const commentobj = {
            ownerId: ownerid,
            text: message,
        }
        const commentadd = await Post.findByIdAndUpdate({ _id: postId }, { $addToSet: { comments: commentobj } });
        res.status(200).json("comment add")
        // console.log("coomenrt")

    }
    catch (err) {
        console.log(err, "error in comment create")
        res.status(500).json({ message: "something is wrong in server" })
    }
}
const updateComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const ownerid = req.userId;
        const message = req.body.message;
        const commentid = req.body.commentid

        const commentobj = {
            ownerId: ownerid,
            text: message
        }
        // console.log(commentobj)


        const user_check = await Post.findOne({ "_id": postId, "comments._id": commentid }).then((data) => {
            const commentArry = data.comments.some(ele => ele.ownerId == ownerid)
            return commentArry
        })

        if (user_check == true) {
            const commentUpdate = await Post.findOneAndUpdate({ "_id": postId, "comments._id": commentid }, { $set: { "comments.$": commentobj } }, { new: true }).then((data) => {
                if (data == null) {
                    res.send("data not exist")
                }
                else { res.status(200).json("data edit") }
            }).catch((err) => {
                res.status(500).json("data not edit")
            })
        } else {
            res.status(400).json({
                message: "your not valid user for this task"
            })
        }

    }
    catch (err) {
        console.log(err, "error in update comment")
        res.status(500).json({ message: "something is wrong in server running" })
    }
}
const deleteComment = async (req, res) => {

    try {
        // const userid = req.userId
        const postId = req.params.id;
        const commentid = req.body.commentid;
        const commentdelete = await Post.updateOne({ "_id": postId }, { $pull: { "comments": { _id: commentid } } })
        // console.log(commentdelete)
        // console.log("comment delte")
        res.status(200).json("comment delete")

    }
    catch (err) {
        console.log(err, "error is delete comment fun")
        res.status(500).json({
            message: "somthing wrong in server"
        })
    }
}

module.exports = { likepost, commentcreate, updateComment, deleteComment }