const { Router } = require('express');
const router = Router();
const ocController = require('../controllers/OCController')

router.route('/').get(ocController.getOC)
router.route('/createOc').post(ocController.createOC)
router.route('/:id').get(ocController.getOneOC)
router.route('/updateOc').put(ocController.updateOC)
router.route('/deleteOc').delete(ocController.deleteOC)

module.exports = router;