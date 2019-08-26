const mongoose = require("mongoose");
const bcrypt = require ('bcryptjs');
const Schema = mongoose.Schema;


const userschema = new Schema({

  email: { type: String, 
    required: true,
  default:'' },

  likes:{type:Array,
   default:[]},

  password: { 
    type: String, 
    required: true,
    default:''
   },

  isDeleted:{
    type:Boolean,
    default:false
  },
  date: { type: Date, default: Date.now }
});

userschema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userschema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userschema);
