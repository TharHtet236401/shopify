const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{type:String,required:true,unique:true},
    price:{type:mongoose.Types.Decimal128,required:true},
    brand:{type:String,required:true},
    image:{type:Array,required:true},   
    quantity:{type:Number,required:true},
    category:{type:Schema.Types.ObjectId,ref:"Category",required:true},
    subcat:{type:Schema.Types.ObjectId,ref:"Subcat",required:true},
    childcat:{type:Schema.Types.ObjectId,ref:"ChildCat",required:true},
    tag:{type:Schema.Types.ObjectId,ref:"tags",required:true},
    refund:{type:String,enum:["Yes","No","In 10 Days"],default:"No"},
    feature:{type:Object,required:true},
    color:{type:Array,required:true},
    created:{type:Date, default:Date.now},
    updated:{type:Date, default:Date.now},

})

module.exports = mongoose.model("Product",ProductSchema);