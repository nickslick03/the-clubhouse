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
    const amOrPm = d.getHours() > 11 ? 'pm' : 'am';
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours() % 12 || 12}:${(d.getMinutes()+'').padStart(2, '0')}${amOrPm}`;
});

module.exports = mongoose.model('message', Message);