const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Main route for initial ping or check
app.get('/api', (req, res) => {
    res.json({ message: 'API - Prueba técnica desarrollador MEAN Stack funcionando correctamente' });
});

// Rutas
const rutasDepartamentos = require('./routes/departamento.rutas');
const rutasEmpleados = require('./routes/empleado.rutas');

app.use('/api/departamentos', rutasDepartamentos);
app.use('/api/empleados', rutasEmpleados);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app; // For Vercel
