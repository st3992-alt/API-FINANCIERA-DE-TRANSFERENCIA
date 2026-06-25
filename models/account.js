
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    ownerName: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    encryptedClabe: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);