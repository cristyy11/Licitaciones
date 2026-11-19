const express = require('express');
const router = express.Router();

const Precio = require('../models/Precio_mercado'); 


router.get('/', async (req, res) => {
    try {
        const precio_mercado = await Precio.find();
        res.json(precio_mercado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los precios' });
    }
});

// Obtener un producto por ID (Para la función de editar)
router.get('/:id', async (req, res) => {
    try {
        const precio_mercado = await Precio.findById(req.params.id);
        if (!precio_mercado) return res.status(404).json({ mensaje: 'Precio no encontrado' });
        res.json(precio_mercado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el precio' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const nuevoPrecio = new Precio(req.body);
        await nuevoPrecio.save();
        res.status(201).json({ mensaje: 'Precio registrado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al guardar el precio' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const precio_mercado = await Precio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!precio_mercado) return res.status(404).json({ mensaje: 'Precio no encontrado' });
        res.json({ mensaje: 'Precio actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el precio' });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const precio_mercado = await Precio.findByIdAndDelete(req.params.id);
        if (!precio_mercado) return res.status(404).json({ mensaje: 'Precio no encontrado' });
        res.json({ mensaje: 'Precio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el Precio' });
    }
});

// Exportar el enrutador (esta es la línea clave que probablemente falta)
module.exports = router;