const {all, add, one, patch, drop} = require('../controllers/user');
const router = require('express-promise-router')();
const {saveFile} = require('../utils/gallery');
const {AllSchema,UserSchema} = require('../utils/Schema');
const {validateBody} = require('../utils/validator');
const {validParams} = require('../utils/validator');

router.get("/", all);
router.post("/", [validateBody(UserSchema.add), add]);
router.route("/:id")
    .get(validParams(AllSchema.id,"id"),one)
    .patch(validParams(AllSchema.id,"id"),validateBody(UserSchema.add), patch)
    .delete(validParams(AllSchema.id,"id"),drop);

module.exports = router;