const {all,add,one,patch,drop}=require("../controllers/childcat")
const {saveFile} = require('../utils/gallery')
const router=require("express").Router()

router.get("/",all)
router.post("/",saveFile,add)

router.route("/:id").get(one).patch(saveFile,patch).delete(drop)

module.exports=router