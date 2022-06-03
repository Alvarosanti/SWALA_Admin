const { Router } = require('express');
const router = Router();
const productsController = require('../controllers/ProductController')

router.route('/').get(productsController.getProducts)
router.route('/createProduct').post(productsController.createProduct)
router.route('/:id').get(productsController.getOneProduct)
router.route('/updateProduct').put(productsController.updateProduct)
router.route('/deleteProduct').delete(productsController.deleteProduct)

module.exports = router;