const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento');

// Obtener todos
router.get('/', async (req, res) => {
    try {
        const departamentos = await Departamento.find();
        res.json(departamentos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear
router.post('/', async (req, res) => {
    const departamento = new Departamento({
        codigo: req.body.codigo,
        nombre: req.body.nombre
    });
    try {
        const nuevoDepto = await departamento.save();
        res.status(201).json(nuevoDepto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar
router.put('/:codigo', async (req, res) => {
    try {
        const departamento = await Departamento.findOneAndUpdate({ codigo: req.params.codigo }, req.body, { new: true });
        if (!departamento) return res.status(404).json({ message: 'No se encontró el departamento' });
        res.json(departamento);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar
router.delete('/:codigo', async (req, res) => {
    try {
        const departamento = await Departamento.findOneAndDelete({ codigo: req.params.codigo });
        if (!departamento) return res.status(404).json({ message: 'No se encontró el departamento' });
        res.json({ message: 'Departamento eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
