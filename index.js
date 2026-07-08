require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Rutas
const accountRoutes = require('./routes/account.routes');
const transactionRoutes = require('./routes/transaction.routes');
const auditLogRoutes = require('./routes/auditLog.routes');

const app = express();

// Conexión a MongoDB
connectDB();

// Middlewares
app.use(helmet());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'API Financiera de Transferencias funcionando correctamente'
    });
});

// Rutas
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auditlogs', auditLogRoutes);

// Exportar para Vercel
module.exports = app;