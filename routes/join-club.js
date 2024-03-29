const express = require('express');
const { get_join_club, post_join_club } = require('../controllers/join-club');

const router = express.Router();

router.get('/', get_join_club);
router.post('/', post_join_club);

module.exports = router;