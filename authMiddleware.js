const authMiddleware = (req, res, next) => {
    // Aceptar temporalmente ambas formas
    const tokenRecibido = (
        req.get('app_token') ||
        req.get('app-token') ||
        ''
    ).trim();

    const tokenGuardado = (
        process.env.APP_TOKEN ||
        ''
    ).trim();

    if (!tokenRecibido) {
        return res.status(401).json({
            message: 'Token requerido',
            headerEsperado: 'app_token'
        });
    }

    if (!tokenGuardado) {
        return res.status(500).json({
            message: 'APP_TOKEN no está configurado'
        });
    }

    if (tokenRecibido !== tokenGuardado) {
        return res.status(403).json({
            message: 'Token de autorización inválido',
            longitudRecibida: tokenRecibido.length,
            longitudGuardada: tokenGuardado.length
        });
    }

    next();
};

module.exports = authMiddleware;