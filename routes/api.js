const {all, register,login,userAddRole,userRemoveRole} = require('../controllers/user');
const router = require('express-promise-router')();
const {saveFile} = require('../utils/gallery');
const {AllSchema,UserSchema} = require('../utils/Schema');
const {validateBody} = require('../utils/validator');
const {validParams} = require('../utils/validator');


router.post("/login", [validateBody(UserSchema.login), login]);
router.post("/register", [validateBody(UserSchema.register), register]);


module.exports = router;