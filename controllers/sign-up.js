const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const login_form_validation = () => [
    body('firstname', 'First Name must be between 1-20 characters')
        .trim()
        .isLength({ min: 1, max: 20 }),
    body('lastname', 'Last Name must be between 1-20 characters')
        .trim()
        .isLength({ min: 1, max: 20 }),
    body('email', 'Email must be a vaild email')
        .trim()
        .isEmail(),
    body('email', 'Email must be less than or equal to 40 characters')
        .isLength({ max: 50 }),
    body('email')
        .custom(async (email) => {
            const exists = (await User.exists({ email })) !== null;
            if (exists) throw new Error('Email already in use');
        }),
    body('password', 'Password ust be at least 8 characters')
        .isLength({ min: 8 })
];

module.exports.get_signup = asyncHandler(async (req, res, next) => {
    res.render('sign-up');
});

module.exports.post_signup = [
    login_form_validation(),
    asyncHandler(async (req, res, next) => {
        const user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            isMember: false,
            isAdmin: false
        });
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.statusCode = 400;
            res.render('sign-up', {
                user,
                errors: result.errors
            });
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err !== undefined) next(err);
                user.password = hash;
                await user.save();
                res.redirect('/login');
            });
        }
    })
];