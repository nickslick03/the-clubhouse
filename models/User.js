const mongoose = require("mongoose");

const { Schema } = mongoose;

const User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isMember: { type: Boolean, reuired: true }
});

User.virtual("fullname").get(function () {
    return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('user', User);