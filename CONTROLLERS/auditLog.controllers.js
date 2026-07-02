const AuditLog = require('../models/auditLog');

// CREATE
exports.createAuditLog = async (req, res) => {
    try {
        const auditLog = await AuditLog.create(req.body);
        res.status(201).json(auditLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ALL
exports.getAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.find()
            .populate('transactionId');

        res.status(200).json(auditLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ONE
exports.getAuditLogById = async (req, res) => {
    try {
        const auditLog = await AuditLog.findById(req.params.id)
            .populate('transactionId');

        if (!auditLog) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json(auditLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
exports.updateAuditLog = async (req, res) => {
    try {
        const auditLog = await AuditLog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!auditLog) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json(auditLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
exports.deleteAuditLog = async (req, res) => {
    try {
        const auditLog = await AuditLog.findByIdAndDelete(req.params.id);

        if (!auditLog) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json({
            message: 'Registro eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};