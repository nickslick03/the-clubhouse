const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

module.exports.index_get = asyncHandler(async (req, res, next) => {
    const messages = await Message.find(null, { user: 0 });
    res.render('index', {
        messages
    });
});