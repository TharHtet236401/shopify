const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderItemSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order',required:true },
  productid:{type:Schema.Types.ObjectId,ref:'Product',required:true},
  price:{type:Number,required:true},
  discount:{type:Number,default:0},
  name:{type:String,required:true},
  image:{type:Array,required:true},
  count:{type:Number,required:true},
  status:{type:Boolean,default:false},
  createdAt: {type:Date,default:Date.now},  
     
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;