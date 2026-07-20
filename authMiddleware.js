const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Los nombres de headers llegan en minúsculas a Node
    const token = req.headers['app_token'];

    if (!token) {
        return res.status(401).json({
            message: 'JWT requerido en el header APP_TOKEN'
        });
    }

    if (!process.env.APP_TOKEN) {
        return res.status(500).json({
            message: 'APP_TOKEN no está configurado'
        });
    }

    try {
        const decoded = jwt.verify(
            token.trim(),
            process.env.APP_TOKEN,
            {
                algorithms: ['HS256']
            }
        );

        req.tokenData = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            message: 'JWT inválido',
            error: error.message
        });
    }
};

module.exports = authMiddleware;