const User = require('./models/User');
const Message = require('./models/Message');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB).then(() => populate()).then(() => console.log('populated'));


async function populate() {
    const newUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@domain.com',
        password: 'helloworld',
        isMember: true
    });
    newUser.save();

    const newMessage = new Message({
        user: newUser.id,
        title: 'hello world',
        body: 'my first message',
        date: Date.now()
    });
    newMessage.save();
}