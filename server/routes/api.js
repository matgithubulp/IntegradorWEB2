const express = require('express');
const translate = require('node-google-translate-skidz');
const router = express.Router(); 

const urlAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/'; // URL base de la API, con esta URL se hacen las consultas
/*
  Esta es la ruta para obtener los departamentos, se manejan solicitudes GET a /departments. Hace la solicitud a la API
  para traer los departamentos que se encuentran disponibles y lo devuelve en un formato JSON
*/
router.get('/departments', async (req, res) => {
  try {
    // Importa dinamicamente el modulo node-fetch para realizar solicitudes HTTP
    const fetch = (await import('node-fetch')).default;
    
    // Hace una solicitud a la API del museo para obtener los departamentos
    const response = await fetch(`${urlAPI}departments`);
    const data = await response.json(); 
    
    res.json(data); // Devuelve un JSON con los departamentos
  } catch (error) {
    console.error('Error al cargar los departamentos:', error);
    res.status(500).json({ error: 'Error al cargar los departamentos' }); //->Aggregado por un error que tenia (No recuerdo)
  }
});


/*
  Basicamente genera las rutas dependiendo del filtro de busqueda y construye la URL de forma dinamica
  basada en los filtros dados y hace la solicitud a la api para obtener los objetos que coincidan
*/
router.get('/buscar', async (req, res) => {
  try {
    // Obtiene los parametros de la consulta (palabra, localizacion, departamentoId)
    const palabra = req.query.palabra;
    const localizacion = req.query.localizacion;
    const departamentoId = req.query.departamentoId;
    
    // Comienza a formar la URL para hacer la bsqueda en la API
    let url = `${urlAPI}search?hasImages=true`;

    // Si se proporciona una palabra clave, la añade a la URL
    if (palabra) {
      url += `&q=${palabra}`;
    }

    // Si se proporciona una localizacion, la añade a la URL
    if (localizacion) {
      url += `&geoLocation=${localizacion}`;
    }

    // Si se proporciona un ID de departamento, lo añade a la URL
    if (departamentoId) {
      url += `&departmentId=${departamentoId}`;
    }

    // Muestra la URL construida en la consola para fines de depuracion
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



/*
 Ruta para obtener informacion detallada de un objeto por su ID
 Esta ruta maneja solicitudes GET a /objeto/:id. Utiliza el ID del objeto para hacer una 
 solicitud a la API para obtener la informacion completa del objeto.
 Despues se traduce utilizando la funcion de translateText y se envia la informacion traducida al lado del cliente en el res.json
*/
router.get('/objeto/:id', async (req, res) => {
  const { id } = req.params; // Obtiene el ID del objeto desde la URL

  try {
    // Realiza una solicitud a la API para obtener el objeto 
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${urlAPI}objects/${id}`);
    const data = await response.json(); // Convierte la respuesta en JSON para despues tradurcilos

    // Traduce los campos de titulo, dinastia y cultura al Español
    const title = await translateText(data.title);
    const culture = await translateText(data.culture || 'Desconocido');
    const dynasty = await translateText(data.dynasty || 'Desconocido');
    
    // Devuelve los datos del objeto con los campos traducidos
    res.json({ ...data, title, culture, dynasty });//los retorna en un json
  } catch (error) {

    console.error('Error al cargar el objeto:', error);
    res.status(500).json({ error: 'Error al cargar el objeto' });
  }
});



/*
 Funcion auxiliar para traducir texto 
 Esta funcion toma un texto y utiliza la libreria node-google-translate-skidz para traducirlo 
 de ingles a español. Si no hay texto proporcionado o si ocurre algún error durante la 
 traducción, la función devuelve un mensaje de error o un texto por defecto. Esta funcion es 
 utilizada por la ruta de /objeto/:id para traducir campos como titulo, dinastia y cultura
*/
async function translateText(text) {
  if (!text || typeof text !== 'string') {
    return 'Sin traduccion'; // Si el texto no es valido, devuelve un mensaje por defecto
  }

  try {
    // Realiza la traduccion del texto usando el modulo de traduccion
    const resultado = await translate({
      text,
      source: 'en',  
      target: 'es'   
    });

    // Si la traduccion es exitosa, la devuelve; de lo contrario, tira un mensaje de error
    if (resultado && resultado.translation) {
      return resultado.translation; 
    } else {
      return 'Error en la traduccion'; 
    }
  } catch (error) {
   
    console.error('Error en la traduccion:', error);//pa debuguear 
    return 'Error en la traduccion'; 
  }
}

module.exports = router;


