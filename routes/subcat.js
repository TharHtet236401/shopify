const {saveFile} = require('../utils/gallery')
const {all,add,one,update,drop} = require('../controllers/subcat')
const router = require('express-promise-router')();


router.get('/',all);
router.post('/',saveFile,add);

router.route('/:id').
        get(one).
        patch(saveFile,update).
        delete(drop);

module.exports = router;