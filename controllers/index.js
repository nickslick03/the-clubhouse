const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

module.exports.index_get = asyncHandler(async (req, res, next) => {
    const isMember = req.user?.isMember;
    const messages =  isMember
        ? await Message.find().populate('user')
        : await Message.find(null, { user: 0 });
    res.render('index', {
        user: req.user,
        messages: messages.reverse()
    });
});