const mongoose = require("mongoose");

const { Schema } = mongoose;

const Message = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date,  required: true },
});

Message.virtual("dateFormatted").get(function () {
    const d = this.date;
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${(d.getMinutes()+'').padStart(2, '0')}`;
});

module.exports = mongoose.model('message', Message);