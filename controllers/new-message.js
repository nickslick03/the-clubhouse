const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const new_messages_validation = () => [
    body('title', 'Title required')
        .trim()
        .notEmpty(),
    body('body', 'Body required')
        .trim()
        .notEmpty()
];

module.exports.get_new_message = asyncHandler(async (req, res, next) => {
    res.render('new-message', {
        user: req.user
    });
});

module.exports.post_new_message = [
    new_messages_validation(),
    asyncHandler(async (req, res, next) => {
        if (req.user == undefined) {
            res.render('new-message', {
                errors: [{msg: 'Not logged in'}]
            });
            return;
        }
        const user = await User.findById(req.user);
        if (!user.isMember) {
            res.render('new-message', {
                errors: [{msg: 'Not a member'}]
            });
            return;
        }
        const results = validationResult(req);
        if (!results.isEmpty()) {
            res.render('new-message', {
                message: {
                    title: req.body.title,
                    body: req.body.body
                },
                errors: results.array()
            });
        } else {
            const message = new Message({
                user: req.user.id,
                title: req.body.title,
                body: req.body.body,
                date: Date.now()
            });
            await message.save();
            res.redirect('/');
        }
    })
];