const mongoose = require('mongoose');

const subcatSchema = new mongoose.Schema({
    name:{type:String,unique:true,required:true,lowercase:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
    image:{type:String,required:true},
    CreatedAt:{type:Date,default:Date.now},
    childcat:[{type:mongoose.Schema.Types.ObjectId,ref:'ChildCat'}]
})

module.exports = mongoose.model('Subcat',subcatSchema);

