const express = require('express');
const translate = require('node-google-translate-skidz');
const router = express.Router();

const urlAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/';

// Ruta para obtener departamentos
router.get('/departments', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${urlAPI}departments`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al cargar los departamentos:', error);
    res.status(500).json({ error: 'Error al cargar los departamentos' });
  }
});

// Ruta para buscar elementos
router.get('/buscar', async (req, res) => {
  try {
    const palabra = req.query.palabra;
    const localizacion = req.query.localizacion;
    let url = `${urlAPI}search?q=${palabra}&hasImages=true`;

    if (localizacion) {
      url += `&geoLocation=${localizacion}`;
    }

    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const data = await response.json();

    if (data.objectIDs && data.objectIDs.length > 0) {
      res.json(data.objectIDs);
    } else {
      res.json([]);
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
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${urlAPI}objects/${id}`);
    const data = await response.json();

   
    // Traducción de los campos relevantes
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
    const result = await translate({
      text,
      source: 'en',  
      target: 'es'   
    });

    // Verifica que haya un resultado y devuelve la traducción
    if (result && result.translation) {
      return result.translation;
    } else {
      return 'Error en la traducción'; 
    }
  } catch (error) {
    console.error('Error en la traducción:', error);
    return 'Error en la traducción'; 
  }
}

module.exports = router;