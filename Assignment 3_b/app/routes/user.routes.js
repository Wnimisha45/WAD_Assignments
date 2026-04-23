const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller.js');

router.post('/', users.create);
router.get('/', users.findAll);
router.get('/:id', users.findOne);
router.patch('/:id', users.update);
router.delete('/:id', users.delete);

module.exports = router;
