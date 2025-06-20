const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    company: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String , required: true },
    email: { type: String, required: true },
    sector: { type: String, required: true },
    actif: { type: Boolean, default: false },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true}
});

module.exports = mongoose.model('Contact', contactSchema);
