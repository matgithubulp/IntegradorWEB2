import { cargarSelect, buscarElementos } from './api.js';
import { domElements } from './domElements.js';
import { mostrarPagina, actualizarBotones } from './ui.js';
import { config } from './config.js';

domElements.botonBuscar.onclick = (event) => buscarElementos(event, domElements);
cargarSelect(domElements.selectDepartamento);

domElements.botonAnterior.onclick = () => {
  if (config.paginaActual > 1) {
    config.paginaActual--;
    mostrarPagina(config.paginaActual, domElements);
    actualizarBotones(domElements);
  }
};

domElements.botonSiguiente.onclick = () => {
  if (config.paginaActual < config.totalPaginas) {
    config.paginaActual++;
    mostrarPagina(config.paginaActual, domElements);
    actualizarBotones(domElements);
  }
};
