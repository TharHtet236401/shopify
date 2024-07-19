const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {type:String, unique:true,required:true},
    image: {type:String, required:true},
    created:{type:Date, default:Date.now}
  });

  const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;