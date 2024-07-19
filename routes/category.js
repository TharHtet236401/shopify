const { all,one,add,drop,update} = require('../controllers/controller');
const {saveFile} = require('../utils/gallery')
const router = require('express-promise-router')();


router.get("/",all)
router.post("/",saveFile,add)

router.route("/:id")
.get(one)
.delete(drop)
.patch(saveFile,update)

module.exports = router;