const Transaction = require('../models/transaction');

// CREATE
exports.createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ALL
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('sourceAccount')
            .populate('destinationAccount');

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ONE
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('sourceAccount')
            .populate('destinationAccount');

        if (!transaction) {
            return res.status(404).json({
                message: 'Transacción no encontrada'
            });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({
                message: 'Transacción no encontrada'
            });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                message: 'Transacción no encontrada'
            });
        }

        res.status(200).json({
            message: 'Transacción eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  