require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Rutas
const accountRoutes = require('./ROUTES/account.routes');
const transactionRoutes = require('./ROUTES/transaction.routes');
const auditLogRoutes = require('./ROUTES/auditLog.routes');

const validateAppToken = require('./appToken.middleware');

const app = express();

// Conexión a MongoDB
connectDB();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(validateAppToken);

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'API Financiera de Transferencias funcionando correctamente'
    });
});

// Rutas
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auditlogs', auditLogRoutes);

// Solo inicia el servidor localmente
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5100;

    app.listen(PORT, () => {
        console.log('=================================');
        console.log(`🚀 Server running on port ${PORT}`);
        console.log('=================================');
    });
}

// Exportar para Vercel
module.exports = app;