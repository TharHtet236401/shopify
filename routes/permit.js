const {all,add,one,patch,drop}=require("../controllers/permit")
const router=require("express").Router()
const {validateBody}= require("../utils/validator")
const {PermitSchema}=require("../utils/Schema")

router.get('/',all)
router.post('/',[validateBody(PermitSchema.add),add])
router.get('/:id',one)
router.patch('/:id',[validateBody(PermitSchema.add),patch])
router.delete('/:id',drop)

module.exports=router
