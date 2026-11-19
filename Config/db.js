const mongoose = require("mongoose");

async function conectarDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "No se encontró MONGODB_URI en el archivo .env"
    );
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  });

  console.log("Conexión con MongoDB exitosa");
  console.log("Base de datos:", mongoose.connection.name);
}

module.exports = conectarDB;