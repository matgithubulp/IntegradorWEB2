import express from 'express';
import path from 'path';
import apiRoutes from './routes/api'; // Importamos las rutas de la API desde api.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Usar las rutas de la API con prefijo /api -> lo hago asi para llamarlo desde script.js
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`El servidor esta activo ${PORT}`);
})