const express = require('express');
const { get_join_admin, post_join_admin } = require('../controllers/join-admin');

const router = express.Router();

router.get('/', get_join_admin);
router.post('/', post_join_admin);

module.exports = router;