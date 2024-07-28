const router = require("express").Router();
const product = require("../controllers/product")
const {saveFile} = require('../utils/gallery')
const {ProductSchema} = require('../utils/Schema');
const {validateBody} = require('../utils/validator');
const {validParams} = require('../utils/validator');



router.post("/",[validateBody(ProductSchema.add),product.add])

module.exports = router