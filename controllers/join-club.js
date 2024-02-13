const asyncHandler = require('express-async-handler');
const User = require('../models/User');

module.exports.get_join_club = asyncHandler(async (req, res, next) => {
    res.render('join-club');
});