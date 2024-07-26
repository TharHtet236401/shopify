const {all, register,login,userAddRole} = require('../controllers/user');
const router = require('express-promise-router')();
const {saveFile} = require('../utils/gallery');
const {AllSchema,UserSchema} = require('../utils/Schema');
const {validateBody} = require('../utils/validator');
const {validParams} = require('../utils/validator');

router.get("/", all);
router.post("/register", [validateBody(UserSchema.register), register]);
router.post("/", [validateBody(UserSchema.login), login]);
router.post("/add/role/",userAddRole);



module.exports = router;