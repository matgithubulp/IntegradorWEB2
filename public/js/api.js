import { config } from './config.js';
import { mostrarPagina, actualizarBotones } from './ui.js';

// Cargar select de departamentos
export async function cargarSelect(selectDepartamento) {
  try {
    const response = await fetch('/api/departments'); // Llama a la ruta del servidor con el prefijo correcto
    const data = await response.json();

    // Agregar departamentos al select
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

// Buscar elementos
export async function buscarElementos(event, domElements) {
  event.preventDefault();
  domElements.spinner.style.display = 'block';

  const { selectDepartamento, entradaPalabra, entradaLocalizacion, contenedorTarjetas } = domElements;
  const departamentoId = selectDepartamento.value;
  const palabra = entradaPalabra.value;      
  const localizacionValor = entradaLocalizacion.value;

  let url = `/api/buscar?`; // Asegúrate de incluir el prefijo aquí

  if (departamentoId) {
    url += `departamentoId=${departamentoId}&`;
  }
  if (palabra) {
    url += `palabra=${encodeURIComponent(palabra)}&`;
  }
  if (localizacionValor) {
    url += `localizacion=${encodeURIComponent(localizacionValor)}&`;
  }

  // Quita el último '&' de la URL si existe
  url = url.replace(/&$/, '');

  try {
    const response = await fetch(url); // Llama a la ruta del servidor
    const data = await response.json();

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

