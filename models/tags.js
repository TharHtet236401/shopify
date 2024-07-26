const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
    name: {type:String, unique:true,required:true},
    created:{type:Date, default:Date.now}

  });

  const tags = mongoose.model('tags', TagsSchema);

module.exports = tags;