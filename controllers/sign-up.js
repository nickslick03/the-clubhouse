const asyncHandler = require('express-async-handler');
const User = require('../models/User');

module.exports.get_signup = asyncHandler(async (req, res, next) => {
    res.render('sign-up');
});