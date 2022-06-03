const { Router } = require('express');
const router = Router();
const userController = require('../controllers/UserController')

router.route('/').get(userController.getUser)
router.route('/createUser').post(userController.createUser)
router.route('/:id').get(userController.getOneUser)
router.route('/updateUser').put(userController.updateUser)
router.route('/deleteUser').delete(userController.deleteUser)

module.exports = router;