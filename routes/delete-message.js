const express = require('express');
const { post_delete_message } = require('../controllers/delete-message');

const router = express.Router();

router.post('/', post_delete_message);

module.exports = router;