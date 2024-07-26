const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    permits:[{type:Schema.Types.ObjectId,ref:'Permit' }]
});

module.exports = mongoose.model('Role', RoleSchema);