const { Router } = require('express');
const router = Router();

router.route('/')
    .get((req, res) => res.json({ message: 'GET products' }))
    .post((req, res) => res.json({ message: 'POST products' }))

module.exports = router;