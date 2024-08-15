const Post = require("../models/Postdata_Model")
const User = require("../models/Signup_Model")
const pic = require("../models/Postdata_Photo_model")
const fs = require('fs');
const path = require('path');
// const { upload } = require("./UserProfile_con") 



function home(req, res) {
    res.send('home page');
}
const homePage = async (req, res) => {

    try {
        const data = await Post.find().populate("photoId").populate("ownerId")
        res.send(data)
    } catch (error) {
        res.send("error")
        console.log(error)
    }
}



const file = async (req, res) => {
    // const baseDir = path.join('http://localhost:3000/app/images');
    try {
        // const folders = fs.readdirSync(baseDir);
        // const objArray = [];

        // folders.forEach((folder) => {
        //     const folderPath = path.join(baseDir, folder);
        //     const files = fs.readdirSync(folderPath);

        //     const obj = {
        //         folder: folder,
        //         files: files,
        //         name: "name"
        //     };
        //     objArray.push(obj);
        // });

        // res.json(objArray);
        // const db = client.db("aggregation");
        // const coll = db.collection("restaurants");
        // // Create sample documents
        // const docs = [
        //     { stars: 3, categories: ["Bakery", "Sandwiches"], name: "Rising Sun Bakery" },
        //     { stars: 4, categories: ["Bakery", "Cafe", "Bar"], name: "Cafe au Late" },
        //     { stars: 5, categories: ["Coffee", "Bakery"], name: "Liz's Coffee Bar" },
        //     { stars: 3, categories: ["Steak", "Seafood"], name: "Oak Steakhouse" },
        //     { stars: 4, categories: ["Bakery", "Dessert"], name: "Petit Cookie" },
        // ];
        // // Insert documents into the restaurants collection
        // const result = await coll.insertMany(docs);
        // console.log(result)
        res.send("ok")

    } catch (error) {
        console.error("Error reading directories:", error);
        res.status(500).send("Internal Server Error");
    }
};

const post_delete = async (req, res) => {
    try {
        const { postid } = req.body;
        const userid = req.userId
        const userFind = await Post.findOne({ _id: postid })
        if (userFind == null) {
            res.status(400).json({ message: "This post not exist" })
        }
        else {
            const postOwner = userFind.ownerId
            if (userid == postOwner) {
                const postFind = await Post.deleteOne({ _id: postid });
                const photoid = userFind.photoId
                const photoFind = await pic.findOneAndDelete({ _id: photoid }, { new: true })
                let photo_path = photoFind.imagepath
                const photo_dir = path.join(__dirname, "../upload")
                fs.unlink(`${photo_dir}/${photo_path}`, (err) => {
                    if (err) {
                        res.status(500).json({
                            message: "something worng in server"
                        })
                    }
                    else {
                        res.status(200).json({
                            message: "post is deleted"
                        })
                    }
                })
            }
            else {
                res.status(400).json({
                    message: "your not valid person for this task"
                })
            }
        }
        // res.send("ok")

        // Delete file with reading folder

        // fs.readdir(photo_dir, (error, files) => {
        //     if (error) throw new Error('Could not read directory');

        //     files.forEach((file) => {
        //     const file_path = path.join(photo_dir, file);
        //     // console.log(file_path);

        //     fs.stat(file_path, (error, stat) => {
        //       if (error) throw new Error('File do not exist');
        //         // console.log(stat)
        //       if(stat.isDirectory()){
        //         console.log('The file is actually a directory')
        //       }else if (file === photo_path ) {
        //         fs.unlink(file_path, (error)=> {
        //           if (error) throw new Error('Could not delete file');
        //             console.log(`Deleted ${file_path}`);
        //         })
        //       }

        //         });
        //        });
        //       });

    }
    catch (err) {
        console.log("something wrong in delete post ", err)
        res.status(500).json({
            message: "something worng in server"
        })
    }
}

module.exports = { home, homePage, file, post_delete }