const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  },
  tipo: String
});

module.exports = mongoose.model(
  'Usuario',
  productoSchema,
  'usuarios'
);