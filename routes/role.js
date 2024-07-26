
const router=require("express").Router()
const {all,add,patch,drop,one,addPermit,removePermit} = require("../controllers/role")

router.get('/',all)
router.post('/',add)
router.patch('/:id',patch)
router.delete('/:id',drop)
router.get('/:id',one)
router.post('/add/permit',addPermit)
router.post('/remove/permit',removePermit)

module.exports = router 