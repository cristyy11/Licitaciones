require('dotenv').config();
const express = require('express');
const path = require('path');
const rutasProductos = require('./routes/productos');
const rutasUsuarios = require('./routes/usuarios');
const rutasCompras = require('./routes/compras_publicas');
const rutasPrecios = require('./routes/precio_mercado');
const conectarDB = require('../Config/db');

conectarDB();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/productos', rutasProductos);

app.use('/api/usuarios', rutasUsuarios);

app.use('/api/compras_publicas', rutasCompras);

app.use('/api/precios_mercado', rutasPrecios);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});