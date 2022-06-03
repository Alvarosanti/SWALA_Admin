const { Router } = require('express');
const router = Router();

router.route('/')
    .get((req, res) => res.json({ message: 'GET users' }))
    .post((req, res) => res.json({ message: 'POST users' }))

module.exports = router;