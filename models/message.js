const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    to:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    type:{type:String,enum:['text','img'],required:true,default:'text'},
    msg:{type:String,required:true},
    created:{type:Date, default:Date.now}
  });

  const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;