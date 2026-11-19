const mongoose = require('mongoose');

const ComprasPublicasSchema = new mongoose.Schema({
  titulo_licitacion: {
    type: String,
    required: true
  },
  descripcion_bienes: {
    type: String,
    required: true
  },
  presupuesto_base: {
    type: Int,
    required: true
  },
  monto_adjuntado: {
    type: IntersectionObserver,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  fecha_publicacion: {
    type: String,
    required: true,
    timestamps:true

  }
});

module.exports = mongoose.model(
  'ComprasPublicas',
  productoSchema,
  'comprasPublicas'
);