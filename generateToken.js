const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Crear una clave aleatoria temporal
const temporarySecret = crypto.randomBytes(64).toString('hex');

// Contenido del JWT
const payload = {
    app: 'API Financiera de Transferencias'
};

// Generar el token
const token = jwt.sign(
    payload,
    temporarySecret,
    {
        algorithm: 'HS256',
        noTimestamp: true
    }
);

// Localizar el archivo .env
const envPath = path.join(__dirname, '.env');

let envContent = '';

if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

// Reemplazar APP_TOKEN si ya existe
if (/^APP_TOKEN=.*$/m.test(envContent)) {
    envContent = envContent.replace(
        /^APP_TOKEN=.*$/m,
        `APP_TOKEN=${token}`
    );
} else {
    // Agregar APP_TOKEN si no existe
    envContent += `\nAPP_TOKEN=${token}\n`;
}

// Guardar sin eliminar las otras variables
fs.writeFileSync(envPath, envContent.trim() + '\n');

console.log('=================================');
console.log('Token generado correctamente');
console.log('Token guardado en APP_TOKEN');
console.log('=================================');
console.log(token);