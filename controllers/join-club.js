const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports.get_join_club = asyncHandler(async (req, res, next) => {
    res.render('join-club', {
        user: req.user
    });
});

module.exports.post_join_club = [
    body('password')
        .custom(async (password) => {
            const memberPassword = await User.findOne({ email: 'member@admin.password' }, { password: 1 });
            const result = await bcrypt.compare(password, memberPassword.password);
            if (!result) throw new Error('Password is incorrect');
        }),
    
    asyncHandler(async (req, res, next) => {
        if (req.user == undefined) {
            res.render('join-club', {
                errors: [{ msg: 'Not logged in'}]
            });
            return;
        }
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.render('join-club', {
                user: req.user,
                errors: result.array()
            })
            return;
        }
        const user = await User.findById(req.user.id);
        user.isMember = true;
        await user.save();
        res.redirect('/');
    })
];