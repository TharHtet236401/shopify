const mongoose = require('mongoose');

const unReadSchema = new mongoose.Schema({
    from:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    to:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  });

  const UnRead = mongoose.model('UnRead', unReadSchema);

module.exports = UnRead;