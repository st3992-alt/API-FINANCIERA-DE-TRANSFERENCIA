const Account = require('../models/account');

// CREATE
exports.createAccount = async (req, res) => {
    try {
        const account = await Account.create(req.body);
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ALL
exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ONE
exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
exports.updateAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        res.status(200).json({ message: 'Cuenta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};