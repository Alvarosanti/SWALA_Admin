const { Router } = require('express');
const router = Router();

router.route('/')
    .get((req, res) => res.json({ message: 'GET products' }))
    .post((req, res) => res.json({ message: 'POST products' }))

router.route('/:id')
    .get((req, res) => res.json({ tittle: 'tittle product' }))
    .put((req, res) => res.json({ message: 'product updated' }))
    .delete((req, res) => res.json({ message: 'product delete' }))

module.exports = router;