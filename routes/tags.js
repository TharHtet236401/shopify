const {all,add,one,patch,drop} = require('../controllers/tags')
const router = require('express-promise-router')();
const {saveFile} = require('../utils/gallery')

router.get("/",all)
router.post("/",saveFile, add)
router.route("/:id")
    .get(one)
    .patch(saveFile,patch)
    .delete(drop)

module.exports = router;