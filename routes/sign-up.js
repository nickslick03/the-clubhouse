const express = require('express');
const { get_signup, post_signup } = require('../controllers/sign-up');

const router = express.Router();

router.get('/', get_signup);

router.post('/', post_signup);

module.exports = router;