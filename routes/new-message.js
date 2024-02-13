const express = require('express');
const { get_new_message } = require('../controllers/new-message');

const router = express.Router();

router.get('/', get_new_message);

module.exports = router;