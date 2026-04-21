const mongoose = require('mongoose');

const esquemaEmpleado = new mongoose.Schema({
    codigo: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido1: { type: String, required: true },
    apellido2: { type: String },
    codigo_departamento: { type: Number, required: true, ref: 'Departamento' }
}, { timestamps: true });

module.exports = mongoose.model('Empleado', esquemaEmpleado);
