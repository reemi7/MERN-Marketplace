const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const otp = new Schema({
    code:{
      type:Number
    },
    email:{
        type:String
    }
  })

  module.exports = mongoose.model('Otp',otp)