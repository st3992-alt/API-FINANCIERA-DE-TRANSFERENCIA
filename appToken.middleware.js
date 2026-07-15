const validateAppToken = (req, res, next) => {

    const appToken = req.headers['app_token'];

    if (!appToken) {
        return res.status(401).json({
            message: 'APP_TOKEN requerido'
        });
    }

    if (appToken !== process.env.APP_TOKEN) {
        return res.status(403).json({
            message: 'APP_TOKEN inválido'
        });
    }

    next();
};

module.exports = validateAppToken;