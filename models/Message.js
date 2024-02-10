const mongoose = require("mongoose");

const { Schema } = mongoose;

const Message = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date,  required: true },
});

Message.virtual("dateFromatted").get(function () {
    return -1
});

module.exports = mongoose.model('message', Message);