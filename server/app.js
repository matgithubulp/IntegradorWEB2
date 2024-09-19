const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api'); // Importamos las rutas de la API desde api.js

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Usar las rutas de la API con prefijo /api
app.use('/api', apiRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
