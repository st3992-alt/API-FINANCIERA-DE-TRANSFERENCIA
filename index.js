require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');

// Middleware JWT
const authMiddleware = require('./authMiddleware');

// Rutas
const accountRoutes = require('./ROUTES/account.routes');
const transactionRoutes = require('./ROUTES/transaction.routes');
const auditLogRoutes = require('./ROUTES/auditLog.routes');

const app = express();

// Conexión a MongoDB
connectDB();

// Middlewares generales
app.use(helmet());
app.use(express.json());

// Ruta principal pública
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'API Financiera de Transferencias funcionando correctamente'
    });
});

// Ruta pública para generar el JWT
app.post('/token', (req, res) => {
    try {
        if (!process.env.APP_TOKEN) {
            return res.status(500).json({
                message: 'APP_TOKEN no está configurado'
            });
        }

        const payload = {
            app: 'API Financiera de Transferencias'
        };

        // noTimestamp permite generar siempre el mismo JWT
        const token = jwt.sign(
            payload,
            process.env.APP_TOKEN,
            {
                algorithm: 'HS256',
                noTimestamp: true
            }
        );

        return res.status(200).json({
            token
        });

    } catch (error) {
        console.error('Error al generar JWT:', error.message);

        return res.status(500).json({
            message: 'Error al generar JWT',
            error: error.message
        });
    }
});

// Todas las rutas siguientes requieren un JWT
app.use(authMiddleware);

// Rutas protegidas
app.use('/api/accounts', authMiddleware, accountRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/auditlogs', authMiddleware, auditLogRoutes);

// Ruta inexistente
app.use((req, res) => {
    return res.status(404).json({
        message: 'Ruta no encontrada'
    });
});

// Middleware general de errores
app.use((error, req, res, next) => {
    console.error('Error del servidor:', error.message);

    return res.status(500).json({
        message: 'Error interno del servidor'
    });
});

// Ejecutar servidor localmente
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5100;

    app.listen(PORT, () => {
        console.log('=================================');
        console.log(`Server running on port ${PORT}`);
        console.log(
            'APP_TOKEN configurado:',
            Boolean(process.env.APP_TOKEN)
        );
        console.log('=================================');
    });
}

// Exportar para Vercel
module.exports = app;