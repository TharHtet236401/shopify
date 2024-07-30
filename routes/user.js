const {all,userAddRole,userRemoveRole,userAddPermit,userRemovePermit,passwordReset} = require('../controllers/user');
const router = require('express-promise-router')();
const {saveFile} = require('../utils/gallery');
const {AllSchema,UserSchema} = require('../utils/Schema');
const {validateBody} = require('../utils/validator');
const {validParams} = require('../utils/validator');

router.get("/", all);

router.post("/add/role/",[userAddRole]);
router.post("/remove/role",[validateBody(UserSchema.addRole),userRemoveRole]);

router.post("/add/permit/",[validateBody(UserSchema.addPermit),userAddPermit]);
router.post("/remove/permit",[validateBody(UserSchema.addPermit),userRemovePermit]);

router.post("/password/reset",[passwordReset])


module.exports = router;