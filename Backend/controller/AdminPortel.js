const Post = require("../models/Postdata_Model");
const User = require("../models/Signup_Model");
const fs = require('fs');
const path = require('path'); // Add this line to use the 'path' module correctly

let permissionFilePath = "E:\\Raheem Data\\projects\\Photo-Uploding\\Backend\\controller\\permission.json";
let data = JSON.parse(fs.readFileSync(permissionFilePath));
const read_per = data[0].Admin.read;
const permission_roll = data[0].Admin.roll;
const delete_per = data[0].Admin.delete;

const admin_per = async (req, res) => {
    try {
        const roll = req.body.roll;
        const find_Admin = await User.findOne({ roll: roll });
        console.log(find_Admin);
        const adminroll = find_Admin.roll;
        let read = find_Admin.permission[0].read;
        console.log(read);
        if (adminroll == "admin" && read) {
            const read_all = await Post.find().catch((err) => {
                console.log(err);
            });
            res.status(200).json({ read_all });
        } else {
            res.status(200).json({ message: "you have not permission" });
        }
    } catch (err) {
        console.log("err in admin portel", err);
        res.status(500).json({
            message: "something wrong in server"
        });
    }
};

const admin_per_del = async (req, res) => {
    try {
        const { roll, postid } = req.body;
        const userFind = await Post.findOne({ _id: postid });
        const find_Admin = await User.findOne({ roll: roll });
        console.log(find_Admin);
        const adminroll = find_Admin.roll;
        let delete_per = find_Admin.permission[0].delete;
        // console.log(read);
        if (adminroll == "admin" && delete_per) {
            const postFind = await Post.deleteOne({ _id: postid });
            const photoid = userFind.photoId;
            const photoFind = await pic.findOneAndDelete({ _id: photoid }, { new: true });
            let photo_path = photoFind.imagepath;
            const photo_dir = path.join(__dirname, "../upload");
            fs.unlink(`${photo_dir}/${photo_path}`, (err) => {
                if (err) {
                    res.status(500).json({
                        message: "something wrong in server"
                    });
                } else {
                    res.status(200).json({
                        message: "post is deleted"
                    });
                }
            });
        } else {
            res.status(400).json({
                message: "your not valid person for this task"
            });
        }
    } catch (err) {
        console.log("something wrong in delete post ", err);
        res.status(500).json({
            message: "something wrong in server"
        });
    }
};

const post_delete = async (req, res) => {
    try {
        const { postid } = req.body;
        const userid = req.userId;
        const userFind = await Post.findOne({ _id: postid });
        if (userFind == null) {
            res.status(400).json({ message: "This post not exist" });
        } else {
            const postOwner = userFind.ownerId;
            if (userid == postOwner) {
                const postFind = await Post.deleteOne({ _id: postid });
                const photoid = userFind.photoId;
                const photoFind = await pic.findOneAndDelete({ _id: photoid }, { new: true });
                let photo_path = photoFind.imagepath;
                const photo_dir = path.join(__dirname, "../upload");
                fs.unlink(`${photo_dir}/${photo_path}`, (err) => {
                    if (err) {
                        res.status(500).json({
                            message: "something wrong in server"
                        });
                    } else {
                        res.status(200).json({
                            message: "post is deleted"
                        });
                    }
                });
            } else {
                res.status(400).json({
                    message: "your not valid person for this task"
                });
            }
        }
    } catch (err) {
        console.log("something wrong in delete post ", err);
        res.status(500).json({
            message: "something wrong in server"
        });
    }
};

const admin_userData = async (req, res) => {
    try {
        const roll = req.body.roll;
        const find_Admin = await User.findOne({ roll: roll });
        console.log(find_Admin);
        const adminroll = find_Admin.roll;
        let read = find_Admin.permission[0].read;
        console.log(read);
        if (adminroll == "admin" && read) {
            console.log(find_Admin);
            const allusersadata = await User.find({ roll: { $ne: "admin" } });
            res.status(200).json({ allusersadata });
        } else {
            res.status(200).json({ message: "you have not permission" });
        }
    } catch (err) {
        console.log("something is wrong in admin User Data", err);
        res.status(500).json({
            message: "something wrong in server"
        });
    }
};

module.exports = { admin_per, admin_per_del, post_delete, admin_userData };
