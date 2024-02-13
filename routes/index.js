const express = require('express');
const { index_get } =require('../controllers/index');

const router = express.Router();

router.get('/', index_get);

module.exports = router;