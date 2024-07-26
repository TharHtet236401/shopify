const mongoose = require('mongoose');
const {Schema} = mongoose;

const PermitSchema = new Schema({
    name:{type:String,unique:true,required:true},
    roles:{type:Schema.Types.ObjectId,ref:"Role"}
      
})

module.exports = mongoose.model('Permit',PermitSchema);