const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let permission_fields = new Schema({
  read:{
    type:Boolean,
    default:null

  },
  delete:{
    type:Boolean,
    default:null
  },
  roll:{
    type:String,
    default:null
  }
  ,
})

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      // unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    roll:{
      type:String,
      default:null
    },
    verify:{
      type:Boolean,
      default:null
    },
    permission:[permission_fields]
  }
);


module.exports = mongoose.model('User', userSchema);