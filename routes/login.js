const express = require('express');
const { get_login, post_login } = require('../controllers/login');

const router = express.Router();

router.get('/', get_login);

router.post('/', post_login);

module.exports = router;