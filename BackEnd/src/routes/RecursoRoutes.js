const { Router } = require('express');
const router = Router();
const recursoController = require('../controllers/RecursoController')

router.route('/').get(recursoController.getRecurso)
router.route('/createRecurso').post(recursoController.createRecurso)
router.route('/:id').get(recursoController.getOneRecurso)
router.route('/updateRecurso/:id').put(recursoController.updateRecurso)
router.route('/updateRecursoState/:id').put(recursoController.updateRecursoState)
router.route('/deleteRecurso/:id').delete(recursoController.deleteRecurso)

module.exports = router;