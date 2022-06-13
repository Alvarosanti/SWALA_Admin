const { Router } = require('express');
const router = Router();
const productsController = require('../controllers/ProductController')

router.route('/').get(productsController.getProducts)
router.route('/createProduct').post(productsController.createProduct)
router.route('/:id').get(productsController.getOneProduct)
router.route('/updateProduct/:id').put(productsController.updateProduct)
router.route('/updateProductState/:id').put(productsController.updateProductState)
router.route('/deleteProduct/:id').delete(productsController.deleteProduct)
router.route('/deleteImages/:id').delete(productsController.deleteImages)

module.exports = router;