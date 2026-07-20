require('dotenv').config({ override: true });

const jwt = require('jsonwebtoken');

if (!process.env.APP_TOKEN) {
    console.error('Error: APP_TOKEN no está configurado en .env');
    process.exit(1);
}

const payload = {
    app: 'API Financiera de Transferencias',
    access: 'full-api'
};

const token = jwt.sign(
    payload,
    process.env.APP_TOKEN,
    {
        algorithm: 'HS256',
        noTimestamp: true
    }
);

console.log('=================================');
console.log('JWT genérico generado:');
console.log('=================================');
console.log(token);