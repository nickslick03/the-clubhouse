const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

module.exports.get_new_message = asyncHandler(async (req, res, next) => {
    res.render('new-message');
});