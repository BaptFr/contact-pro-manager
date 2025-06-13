const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    company: { type: String, required: true },
    adress: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    sector: { type: String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});

module.exports = mongoose.model('Contact', contactSchema);
