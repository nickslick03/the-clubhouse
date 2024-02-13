const express = require('express');
const { get_login } = require('../controllers/login');

const router = express.Router();

router.get('/', get_login);

module.exports = router;