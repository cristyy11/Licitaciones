const mongoose = require('mongoose');

const PrecioMercadoSchema = new mongoose.Schema({
  nombre_producto: {
    type: String,
    required: true
  },
  categoria:String,

  precio_promedio_mercado:{    type: String,
    required: true
  },
  unidad_medida: {
    type: String,
    required: true
  },
  fecha_actualizacion: {
    type: String,
    required: true,
    timestamps:true
  }
});

module.exports = mongoose.model(
  'PrecioMercado',
  productoSchema,
  'precioMercado'
);