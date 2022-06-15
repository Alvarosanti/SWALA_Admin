const { Router } = require('express');
const router = Router();
const categoryController = require('../controllers/CategoryController')

router.route('/').get(categoryController.getAllCategory)

module.exports = router;