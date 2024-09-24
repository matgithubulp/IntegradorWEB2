import express from 'express';
import translate from 'node-google-translate-skidz';
import fetch from 'node-fetch';

const router = express.Router();
const urlAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/';

// Ruta para obtener departamentos
router.get('/departments', async (req, res) => {
  try {
    const response = await fetch(`${urlAPI}departments`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al cargar los departamentos:', error);
    res.status(500).json({ error: 'Error al cargar los departamentos' });
  }
});

// Ruta para buscar
router.get('/buscar', async (req, res) => {
  try {
    const palabra = req.query.palabra;
    const localizacion = req.query.localizacion;
    const departamentoId = req.query.departamentoId;
    let url = `${urlAPI}search?hasImages=true`;

    // Agregar palabra clave a la url
    if (palabra) {
      url += `&q=${palabra}`;
    }

    // Agregar la localizacion a la url
    if (localizacion) {
      url += `&q=${palabra ? `${palabra} ` : ''}&geoLocation=${localizacion}`;
    }

    // Agregar el partamento
    if (departamentoId) {
      url += `&q=${palabra ? `${palabra} ` : ''}&departmentId=${departamentoId}`;
    }

    console.log('url para buscar():', url);

    const response = await fetch(url);
    const data = await response.json();

    if (data.objectIDs && data.objectIDs.length > 0) {
      res.json(data.objectIDs);
    } 
  } catch (error) {
    console.error('Error al buscar el elemento:', error);
    res.status(500).json({ error: 'Error al buscar el elemento' });
  }
});

// Ruta para obtener un objeto traducido
router.get('/objeto/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(`${urlAPI}objects/${id}`);
    const data = await response.json();

    // Traduccion  -> me falta la fecha
    const title = await translateText(data.title);
    const culture = await translateText(data.culture || 'Desconocido');
    const dynasty = await translateText(data.dynasty || 'Desconocido');
    
    // Respuesta con los datos traducidos
    res.json({ ...data, title, culture, dynasty });
  } catch (error) {
    console.error('Error al cargar el objeto:', error);
    res.status(500).json({ error: 'Error al cargar el objeto' });
  }
});

// Función de traducción utilizando `node-google-translate-skidz`
async function translateText(text) {
  if (!text || typeof text !== 'string') {
    return 'Sin traducción'; 
  }

  try {
    const resultado = await translate({
      text,
      source: 'en',  
      target: 'es'   
    });

    if (resultado && resultado.translation) {
      return resultado.translation; 
    } else {
      return 'Error en la traducción'; 
    }
  } catch (error) {
    console.error('Error en la traducción:', error);
    return 'Error en la traducción'; 
  }
}

export default router;