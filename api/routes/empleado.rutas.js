const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');
router.get('/', async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/', async (req, res) => {
    const empleado = new Empleado({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        codigo_departamento: req.body.codigo_departamento
    });
    try {
        const nuevoEmpleado = await empleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/:codigo', async (req, res) => {
    try {
        const empleado = await Empleado.findOneAndUpdate({ codigo: req.params.codigo }, req.body, { new: true });
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json(empleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:codigo', async (req, res) => {
    try {
        const empleado = await Empleado.findOneAndDelete({ codigo: req.params.codigo });
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json({ message: 'Empleado eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
