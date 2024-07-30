const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  count: { type: Number, required: true },
  total: { type: Number, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
  status: {type:Boolean,default:false},
  createdAt: {type:Date,default:Date.now},
  updatedAt: {type:Date,default:Date.now},
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;