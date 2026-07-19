const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Token requerido'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.APP_TOKEN
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Token inválido'
        });

    }
};

module.exports = authMiddleware;