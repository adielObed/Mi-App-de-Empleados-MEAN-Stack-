const mongoose = require('mongoose');

const esquemaDepartamento = new mongoose.Schema({
    codigo: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Departamento', esquemaDepartamento);
