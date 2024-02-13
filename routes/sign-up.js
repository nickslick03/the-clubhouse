const express = require('express');
const { get_signup } = require('../controllers/sign-up');

const router = express.Router();

router.get('/', get_signup);

module.exports = router;