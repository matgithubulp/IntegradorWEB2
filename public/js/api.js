
import { config } from './config.js';
import { mostrarPagina, actualizarBotones } from './ui.js';
export async function cargarSelect(selectDepartamento) {
  try {
    const respuesta = await fetch(`${config.urlAPI}departments`);
    const data = await respuesta.json();

    data.departments.forEach(departamento => {
      const opcionSelect = document.createElement('option');
      opcionSelect.setAttribute('value', departamento.departmentId);
      opcionSelect.textContent = departamento.displayName;
      selectDepartamento.appendChild(opcionSelect);
    });
  } catch (error) {
    console.error('Error al cargar los departamentos:', error);
  }
}

export async function buscarElementos(event, domElements) {
  event.preventDefault();
  domElements.spinner.style.display = 'block';

  try {
    const { selectDepartamento, entradaPalabra, entradaLocalizacion, contenedorTarjetas } = domElements;
    const departamentoId = selectDepartamento.value;
    const palabra = entradaPalabra.value;      
    const localizacionValor = entradaLocalizacion.value;  

    // Comienza a construir la URL de búsqueda
    let url = `${config.urlAPI}buscar?`;

    // Si hay un departamento seleccionado, añade el parámetro a la URL
    // Si no hay departamento, no agrega el parámetro y busca en todos los departamentos
    if (departamentoId) {
      url += `departamentoId=${departamentoId}&`;
    }

    // Si hay una palabra clave ingresada, añade el parámetro a la URL
    if (palabra) {
      url += `palabra=${encodeURIComponent(palabra)}&`;
    }

    // Si hay una localización ingresada, añade el parámetro a la URL
    if (localizacionValor) {
      url += `localizacion=${encodeURIComponent(localizacionValor)}&`;
    }

    // Quita el último '&' de la URL si existe
    url = url.replace(/&$/, '');

    console.log('URL de búsqueda:', url);

    // Realiza la consulta a la API
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    if (data.length > 0) {
      config.idsObjetos = data;
      config.totalPaginas = Math.ceil(config.idsObjetos.length / 20);
      config.paginaActual = 1;
      mostrarPagina(config.paginaActual, domElements);  // Muestra la primera página de resultados
      actualizarBotones(domElements);  // Actualiza los botones de paginación
    } else {
      contenedorTarjetas.innerHTML = 'No se encontraron elementos.';
    }
  } catch (error) {
    console.error('Error al buscar el elemento:', error);
  } finally {
    domElements.spinner.style.display = 'none';
  }
}


