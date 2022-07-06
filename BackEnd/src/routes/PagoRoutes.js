const { Router } = require('express');
const router = Router();
const pagoController = require('../controllers/PagoController')

router.route('/').get(pagoController.getPagos)
router.route('/:id').get(pagoController.getOnePagos)


module.exports = router;