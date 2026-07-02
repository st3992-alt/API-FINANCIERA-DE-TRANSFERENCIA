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

// Rutas
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auditlogs', auditLogRoutes);

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log('Hello World');
    console.log(`Server running on port ${PORT}`);
});