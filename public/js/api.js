// Importacion de los modulos que se van a utilizar, express para las consultas y node-google-translate-skidz para la traduccion
const express = require('express');
const translate = require('node-google-translate-skidz');
const router = express.Router(); // Crea un nuevo enrutador para manejar las rutas

// URL base de la API
const urlAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/';

// Ruta para obtener departamentos
// Cuando el usuario accede a /departments, se hace una solicitud a la API del museo
router.get('/departments', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
  
    // Hace una solicitud a la API del museo para obtener los departamentos
    const response = await fetch(`${urlAPI}departments`);
    const data = await response.json(); // Convierte la respuesta en JSON
    
    // Devuelve los departamentos obtenidos en formato JSON al cliente
    res.json(data);
  } catch (error) {
    console.error('Error al cargar los departamentos:', error);
    res.status(500).json({ error: 'Error al cargar los departamentos' });
  }
});

// Ruta para buscar objetos segun filtros de palabra 
router.get('/buscar', async (req, res) => {
  try {
    // Obtiene los parametros de la consulta 
    const palabra = req.query.palabra;
    const localizacion = req.query.localizacion;
    const departamentoId = req.query.departamentoId;
    
    // Comienza a formar la URL para hacer la busqueda en la API
    let url = `${urlAPI}search?hasImages=true`;

    // Si se da una palabra clave, la agrega a la URL
    if (palabra) {
      url += `&q=${palabra}`;
    }

    // Si se da una localización, la agregaa la URL
    if (localizacion) {
      url += `&q=${palabra ? `${palabra} ` : ''}&geoLocation=${localizacion}`;
    }

    // Si se da un ID de departamento, lo agrrega a la URL
    if (departamentoId) {
      url += `&q=${palabra ? `${palabra} ` : ''}&departmentId=${departamentoId}`;
    }

    // este console.log esta para depurar
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

// Ruta para obtener un objeto de arte por su ID y traducir algunos campos
router.get('/objeto/:id', async (req, res) => {
  const { id } = req.params; // Obtiene el ID del objeto desde la URL

  try {
    // Realiza una solicitud a la API para obtener el objeto segun su ID
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${urlAPI}objects/${id}`);
    const data = await response.json(); // se convierte la respuesta en JSON

    // Traduce los campos -> faltaria fecha
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

// Funcion de traduccion utilizando `node-google-translate-skidz`
// Esta función toma un texto en ingles y lo traduce al español
async function translateText(text) {
  if (!text || typeof text !== 'string') {
    return 'Sin traducción'; // Si no hay texto valido devuelve un SIn traaduccion
  }

  try {
    const resultado = await translate({
      text,
      source: 'en',  
      target: 'es'   
    });

    // Devuelve el texto traducido si la traducción fue exitosa
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

// Exporta el enrutador para que pueda ser utilizado en otras partes del código
module.exports = router;

