const { Router } = require('express');
const router = Router();
const recursoController = require('../controllers/RecursoController')

router.route('/').get(recursoController.getRecurso)
router.route('/getRecursoHabilitado').get(recursoController.getRecursoHabilitado)
router.route('/getRecursoAlerta').get(recursoController.getRecursoAlerta)
router.route('/createRecurso').post(recursoController.createRecurso)
router.route('/:id').get(recursoController.getOneRecurso)
router.route('/updateRecurso/:id').put(recursoController.updateRecurso)
router.route('/updateRecursoState/:id').put(recursoController.updateRecursoState)
router.route('/updateRecursoAlert/:id').put(recursoController.updateRecursoAlert)
router.route('/deleteRecurso/:id').delete(recursoController.deleteRecurso)

module.exports = router;