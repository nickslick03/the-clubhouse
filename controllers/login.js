const asyncHandler = require('express-async-handler');
const User = require('../models/User');

module.exports.get_login = asyncHandler(async (req, res, next) => {
    res.render('login');
});