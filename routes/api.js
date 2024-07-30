const {all, register,login,userAddRole,userRemoveRole} = require('../controllers/user');
const router = require('express-promise-router')();
const {saveFile} = require('../utils/gallery');
const {AllSchema,UserSchema,ProductSchema} = require('../utils/Schema');
const {validateBody,validParams,validateToken} = require('../utils/validator');
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const subcatController = require('../controllers/subcat');
const childcatController = require('../controllers/childcat');
const tagController = require('../controllers/tags');
const orderController = require('../controllers/order');

router.post("/login", [validateBody(UserSchema.login), login]);
router.post("/register", [validateBody(UserSchema.register), register]);


router.get("/products/:page",[validParams(AllSchema.page,'page'),productController.all])
router.get("/cats",[categoryController.all])
router.get("/subcats",[subcatController.all])
router.get("/childcats",[childcatController.all])
router.get("/tags",[tagController.all])
router.get("/products/cats/:id",[validParams(AllSchema.id ,'id'),productController.catProduct])
router.get("/products/subcats/:id",[validParams(AllSchema.id ,'id'),productController.subCatProduct])
router.get("/products/childcats/:id",[validParams(AllSchema.id ,'id'),productController.childCatProduct])
router.post("/order",[validateToken(),orderController.add])
router.get("/myorders",[validateToken(),orderController.getOrders])


module.exports = router;