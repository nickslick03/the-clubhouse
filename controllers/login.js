const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const passport = require('passport');


module.exports.get_login = asyncHandler(async (req, res, next) => {
    res.render('login', {
        error: req.session.messages ? req.session.messages[req.session.messages.length - 1] : null
    });
});

module.exports.post_login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
})