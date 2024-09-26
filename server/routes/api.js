// iimportacion de modulos necesarios para el proyecto
const express = require('express');
const translate = require('node-google-translate-skidz');
const router = express.Router(); 


const urlAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/';//url base de la api, con esta url se hacne las consultas

// Ruta para obtener departamentos
router.get('/departments', async (req, res) => {
  try {
    // Importa dinámicamente el módulo node-fetch para realizar solicitudes HTTP
    const fetch = (await import('node-fetch')).default;
    
    // Hace una solicitud a la API del museo para obtener los departamentos
    const response = await fetch(`${urlAPI}departments`);
    const data = await response.json(); 
    
    
    res.json(data);//devuelve un json con los departamentos
  } catch (error) {
   
    console.error('Error al cargar los departamentos:', error);
    res.status(500).json({ error: 'Error al cargar los departamentos' });
  }
});

// Ruta para buscar objetos segun los filtros
router.get('/buscar', async (req, res) => {
  try {
    // Obtiene los parametros de la consulta 
    const palabra = req.query.palabra;
    const localizacion = req.query.localizacion;
    const departamentoId = req.query.departamentoId;
    
    // Comienza a formar la URL para hacer la búsqueda en la API
    let url = `${urlAPI}search?hasImages=true`;

    // Si se proporciona una palabra clave, la añade a la URL
    if (palabra) {
      url += `&q=${palabra}`;
    }

    // Si se proporciona una localizacion, la añade a la URL
    if (localizacion) {
      url += `&q=${palabra ? `${palabra} ` : ''}&geoLocation=${localizacion}`;
    }

    // Si se proporciona un ID de departamento, lo añade a la URL
    if (departamentoId) {
      url += `&q=${palabra ? `${palabra} ` : ''}&departmentId=${departamentoId}`;
    }

    // Muestra la URL construida en la consola para fines de depuración
    console.log('url para buscar():', url);

    // Realiza la solicitud a la API usando la URL formada
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);

    // Convierte la respuesta en JSON
    const data = await response.json();

    // Si se encontraron resultados, los devuelve en formato JSON
    if (data.objectIDs && data.objectIDs.length > 0) {
      res.json(data.objectIDs);
    } 
  } catch (error) {

    console.error('Error al buscar el elemento:', error);
    res.status(500).json({ error: 'Error al buscar el elemento' });
  }
});

// Ruta para obtener un objeto  por su ID 
router.get('/objeto/:id', async (req, res) => {
  const { id } = req.params; // Obtiene el ID del objeto desde la URL

  try {
    // Realiza una solicitud a la API para obtener el objeto 
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${urlAPI}objects/${id}`);
    const data = await response.json(); // Convierte la respuesta en JSON

    // Traduce los campos de titulo, cultura y dinastia -> podria agregar fecha
    const title = await translateText(data.title);
    const culture = await translateText(data.culture || 'Desconocido');
    const dynasty = await translateText(data.dynasty || 'Desconocido');
    
    // Devuelve los datos del objeto con los campos traducidos
    res.json({ ...data, title, culture, dynasty });
  } catch (error) {

    console.error('Error al cargar el objeto:', error);
    res.status(500).json({ error: 'Error al cargar el objeto' });
  }
});

// Función de traducción utilizando `node-google-translate-skidz`
// Esta función toma un texto en inglés y lo traduce al español
async function translateText(text) {
  if (!text || typeof text !== 'string') {
    return 'Sin traducción'; // Si no hay texto válido, devuelve un mensaje por defecto
  }

  try {
   
    const resultado = await translate({
      text,
      source: 'en',  
      target: 'es'   
    });

    // Devuelve el texto traducido o un mensaje de error
    if (resultado && resultado.translation) {
      return resultado.translation; 
    } else {
      return 'Error en la traducción'; 
    }
  } catch (error) {
    // Si ocurre un error en la traducción, lo muestra en consola y devuelve un mensaje de error
    console.error('Error en la traducción:', error);
    return 'Error en la traducción'; 
  }
}


module.exports = router;
