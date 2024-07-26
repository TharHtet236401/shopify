const mongoose = require('mongoose');
const{Schema} = mongoose;

const UserSchema = new mongoose.Schema({
    name: {type:String, unique:true,required:true},
    phone: {type:String, unique:true,required:true},
    password: {type:String, required:true},
    created:{type:Date, default:Date.now},
    roles:[{type:Schema.Types.ObjectId, ref:"Role"}],
    permits:[{type:Schema.Types.ObjectId, ref:"Permit"}]

  });

  const user = mongoose.model('user', UserSchema);

module.exports = user;