const Post = require("../models/Postdata_Model")
const Pic = require("../models/Postdata_Photo_model")
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uniqid');
let path = require('path');
const fs = require("fs");

const uploadImage = path.join(__dirname, "../upload");

if (!fs.existsSync(uploadImage)) {

    fs.mkdirSync(uploadImage)

}

const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "full",
  });
  const now = new Date();
  const formattedDate = formatter.format(now);
//   console.log(formattedDate); 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload');
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random()*1000)+"-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });



const CraetePost = async (req, res) => {
    // console.log(req.userId)
    try {
        const name = req.body.name;
        const title = req.body.title;
        const photoName = req.file.filename;
        const photobuffer = req.file.buffer;
        const photopath = req.file.path;
        const photomimetype = req.file.mimetype;
        const userId = req.userId
        // console.log(name, title)

        const Photodata = {
            image: photobuffer,
            photoname: name,
            imagepath: photoName,
            imagemimetype: photomimetype,
            filepath:photopath,
            discription: title,

        }
        const Photodata2 = new Pic(Photodata);
        // const 
        // new User(newUserData);
        await Photodata2.save().then((data) => {
            const newUserData = {
                name,
                title,
                photoId: data._id,
                ownerId:userId,
            }
            const Postdata = new Post(newUserData)
            Postdata.save()
        }).catch((err) => {
            console.log(err)
        })


        res.status(200).json({
            message: "post Submit"
        })
    }
    catch (err) {
        console.error(err, "Something is wrong in create post")
    }
};


const validate = async (req , res)=>{
    console.log(req.userId)
    res.json({success :"success"})
}



module.exports = { CraetePost, upload , validate }