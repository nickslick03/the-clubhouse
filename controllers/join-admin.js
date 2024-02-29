const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports.get_join_admin = asyncHandler(async (req, res, next) => {
    res.render('join-admin', {
        user: req.user
    });
});

module.exports.post_join_admin = [
    body('password')
        .custom(async (password) => {
            const adminPassword = await User.findOne({ email: 'admin@admin.password' }, { password: 1 });
            const result = await bcrypt.compare(password, adminPassword.password);
            if (!result) throw new Error('Password is incorrect');
        }),
    
    asyncHandler(async (req, res, next) => {
        if (req.user == undefined) {
            res.render('join-admin', {
                errors: [{ msg: 'Not logged in'}]
            });
            return;
        }
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.render('join-admin', {
                user: req.user,
                errors: result.array()
            })
            return;
        }
        const user = await User.findById(req.user.id);
        user.isAdmin = true;
        await user.save();
        res.redirect('/');
    })
];