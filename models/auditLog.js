
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    details: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);