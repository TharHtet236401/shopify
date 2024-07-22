const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type:String, unique:true,required:true},
    phone: {type:String, unique:true,required:true},
    password: {type:String, required:true},
    created:{type:Date, default:Date.now}

  });

  const user = mongoose.model('user', UserSchema);

module.exports = user;