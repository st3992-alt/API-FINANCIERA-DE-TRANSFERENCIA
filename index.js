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
    res.status(200).json({
        message: 'API Financiera de Transferencias funcionando correctamente'
    });
});

// Ruta pública para generar siempre el mismo JWT
app.post('/token', (req, res) => {
    try {
        // Comprobar que exista APP_TOKEN
        if (!process.env.APP_TOKEN) {
            return res.status(500).json({
                message: 'APP_TOKEN no está configurado en el servidor'
            });
        }

        // El payload debe permanecer igual para producir el mismo JWT
        const payload = {
            app: 'API Financiera de Transferencias'
        };

        // noTimestamp evita que se agregue una fecha diferente
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
        console.error('Error al generar el JWT:', error.message);

        return res.status(500).json({
            message: 'Error al generar el token',
            error: error.message
        });
    }
});

// Rutas protegidas con JWT
app.use(
    '/api/accounts',
    authMiddleware,
    accountRoutes
);

app.use(
    '/api/transactions',
    authMiddleware,
    transactionRoutes
);

app.use(
    '/api/auditlogs',
    authMiddleware,
    auditLogRoutes
);

// Middleware para rutas inexistentes
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

// Ejecutar el servidor solamente en local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5100;

    app.listen(PORT, () => {
        console.log('=================================');
        console.log(`🚀 Server running on port ${PORT}`);
        console.log('=================================');
    });
}

// Exportar la aplicación para Vercel
module.exports = app;