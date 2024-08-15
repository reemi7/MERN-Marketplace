const mongoose = require('mongoose');
const { schema } = require('./Postdata_Model');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    image: {
        data: Buffer,
        type: String
    },
    imagepath: {
        type: String,

    },
    imagemimetype: {
        type: String
    },
    photoname: {
        type: String
    },
    filepath: {
        type: String
    },
    discription: {
        type: String
    },
})

module.exports = mongoose.model("postphoto", PhotoSchema)
