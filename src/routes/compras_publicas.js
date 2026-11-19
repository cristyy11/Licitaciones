const express = require('express');
const router = express.Router();

const Compras = require('../models/Compras_publicas'); 


router.get('/', async (req, res) => {
    try {
        const compra_mercado = await Compras.find();
        res.json(compra_mercado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las compras' });
    }
});

// Obtener un producto por ID (Para la función de editar)
router.get('/:id', async (req, res) => {
    try {
        const compra_mercado = await Compras.findById(req.params.id);
        if (!compra_mercado) return res.status(404).json({ mensaje: 'Compra no encontrada' });
        res.json(compra_mercado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la compra' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const nuevaCompra = new Compras(req.body);
        await nuevaCompra.save();
        res.status(201).json({ mensaje: 'Compra registrada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al guardar la compra' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const compra_mercado = await Compras.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!compra_mercado) return res.status(404).json({ mensaje: 'Compra no encontrada' });
        res.json({ mensaje: 'Compra actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la compra' });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const compra_mercado = await Compras.findByIdAndDelete(req.params.id);
        if (!compra_mercado) return res.status(404).json({ mensaje: 'Compra no encontrada' });
        res.json({ mensaje: 'Compra eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la compra' });
    }
});

// Exportar el enrutador (esta es la línea clave que probablemente falta)
module.exports = router;