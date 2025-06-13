const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contacts: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'} ]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);


module.exports = User;
