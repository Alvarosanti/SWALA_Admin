const { Router } = require('express');
const router = Router();
const providerController = require('../controllers/ProviderController')

router.route('/').get(providerController.getProviders)
router.route('/createProvider').post(providerController.createProvider)
router.route('/:id').get(providerController.getOneProvider)
router.route('/updateProvider/:id').put(providerController.updateProvider)
router.route('/updateProviderState/:id').put(providerController.updateProviderState)
router.route('/deleteProvider/:id').delete(providerController.deleteProvider)
router.route('/mail').post(providerController.sendEmailProvider)

module.exports = router;