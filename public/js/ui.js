
import { config } from './config.js';

export async function mostrarPagina(pagina, domElements) {
  const { contenedorTarjetas, spinner, paginaActualTexto } = domElements;
  spinner.style.display = 'block';

  const inicio = (pagina - 1) * 20;
  const fin = inicio + 20;
  const objetosPagina = config.idsObjetos.slice(inicio, fin);

  contenedorTarjetas.innerHTML = '';

  const promesas = objetosPagina.map(async (objetoID) => {
    const objetoRespuesta = await fetch(`${config.urlAPI}objeto/${objetoID}`);
    const objetoData = await objetoRespuesta.json();
    crearTarjeta(objetoData, contenedorTarjetas);
  });

  await Promise.all(promesas);

  paginaActualTexto.textContent = config.paginaActual;
  spinner.style.display = 'none';
}

export function crearTarjeta(objeto, contenedorTarjetas) {
  if (!objeto.title || objeto.title === 'undefined') return;

  const tarjeta = document.createElement('div');
  tarjeta.classList.add('tarjeta');

  const fecha = objeto.objectDate || objeto.period || 'Desconocido';
  tarjeta.setAttribute('title', `Fecha: ${fecha}`);

  const dinastia = objeto.dynasty || 'Desconocido';
  const cultura = objeto.culture || 'Desconocido';

  tarjeta.innerHTML = `
    <img src="${objeto.primaryImageSmall || 'https://via.placeholder.com/150'}" alt="${objeto.title}" class="tarjeta-img-superior">
    <div class="cuerpo-tarjeta">
      <h5 class="titulo-tarjeta">${objeto.title}</h5>
      <p class="texto-tarjeta">Cultura: ${cultura}</p>
      <p class="texto-tarjeta">Dinastía: ${dinastia}</p>
    </div>
  `;

  if (objeto.additionalImages && objeto.additionalImages.length > 1) {
    const botonVerMas = document.createElement('button');
    botonVerMas.textContent = 'Ver más';
    botonVerMas.classList.add('btn-ver-mas');
    botonVerMas.addEventListener('click', () => {
      window.location.href = `/ver-mas-imagenes.html?images=${objeto.additionalImages.join(',')}`;
    });
    tarjeta.querySelector('.cuerpo-tarjeta').appendChild(botonVerMas);
  }

  contenedorTarjetas.appendChild(tarjeta);
}

export function actualizarBotones(domElements) {
  const { botonAnterior, botonSiguiente } = domElements;
  botonAnterior.disabled = config.paginaActual === 1;
  botonSiguiente.disabled = config.paginaActual === config.totalPaginas;
}
