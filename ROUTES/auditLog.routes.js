const express = require('express');
const router = express.Router();

const auditLogController = require('../CONTROLLERS/auditLog.controllers');

router.post('/', auditLogController.createAuditLog);
router.get('/', auditLogController.getAuditLogs);
router.get('/:id', auditLogController.getAuditLogById);
router.put('/:id', auditLogController.updateAuditLog);
router.delete('/:id', auditLogController.deleteAuditLog);

module.exports = router;