const { Router } = require('express');
const router = Router();
const pagoController = require('../controllers/PagoController')

router.route('/').get(pagoController.getPagos)
router.route('/:id').get(pagoController.getOnePagos)
router.route('/updatePagoState/:id').put(pagoController.updatePagoState)


module.exports = router;