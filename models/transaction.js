const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sourceAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    destinationAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);