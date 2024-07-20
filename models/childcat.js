const mongoose = require('mongoose');

const childcatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    subcat: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcat' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChildCat', childcatSchema);