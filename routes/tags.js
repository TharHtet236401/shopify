const {all, add, one, patch, drop} = require('../controllers/tags');
const router = require('express-promise-router')();
const {saveFile} = require('../utils/gallery');
const {TagSchema,AllSchema} = require('../utils/Schema');
const {validateBody} = require('../utils/validator');
const {validParams} = require('../utils/validator');

router.get("/", all);
router.post("/", [saveFile,validateBody(TagSchema.add), add]);
router.route("/:id")
    .get(validParams(AllSchema.id,"id"),one)
    .patch(saveFile,validParams(AllSchema.id,"id"),validateBody(TagSchema.add), patch)
    .delete(validParams(AllSchema.id,"id"),drop);

module.exports = router;