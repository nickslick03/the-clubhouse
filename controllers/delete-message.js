const asyncHandler = require('express-async-handler');
const { validationResult, body } = require('express-validator');
const User = require('../models/User');
const Message = require('../models/Message');

const delete_message_validator = () => [
    body('message')
        .custom(async (id) => {
            const exists = await Message.exists({ _id: id });
            if (exists == null) throw new Error("Message does not exist");
        })
];

module.exports.post_delete_message = [
    delete_message_validator(),
    asyncHandler(async (req, res, next) => {
        
        if (!(req.user && req.user.isAdmin)) {
            res.status = 401
            res.render('delete-message', {
                errors: [{msg: 'You do not have admin perms'}]
            })
            return;
        }
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.render('delete-message', {
                errors: result.array()
            });
            return;
        }
        await Message.findByIdAndDelete(req.body.message);
        res.redirect('/');
    })
];