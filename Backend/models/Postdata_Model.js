const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentobj = new Schema({
    ownerId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        defult:null
    },
    text:{
        type:String,
    },

})

const postSchema = new Schema({
    name: {
        type: String,
    }, 
    title: {
        type: String
    },
    photoId:{
        type:mongoose.Types.ObjectId,
        ref:"postphoto",
        defult:null,
    },
    ownerId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        defult:null
    },
    like: [
        
        {
        likeuserId: {
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        ownerId:{
            type:mongoose.Types.ObjectId,
            defult:null

        }

    }],
    comments:[commentobj]
});

const Post = mongoose.model('postdata', postSchema);

module.exports = Post;