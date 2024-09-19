const selectDepartamento = document.getElementById('seleccion-departamento');
const entradaPalabra = document.getElementById('entrada-palabra');
const entradaLocalizacion = document.getElementById('entrada-localizacion');
const botonBuscar = document.getElementById('boton-buscar');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const botonAnterior = document.getElementById('anterior');
const botonSiguiente = document.getElementById('siguiente');
const paginaActualTexto = document.getElementById('pagina-actual');
const urlAPI = '/api/';
let paginaActual = 1;
let totalPaginas = 0;
let idsObjetos = [];

botonBuscar.onclick = buscarElementos;
cargarSelect();

async function cargarSelect() {
  try {
    const respuesta = await fetch(`${urlAPI}departments`);
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

// Buscar elementos segun palabra clave y localizzacion
async function buscarElementos(event) {
  event.preventDefault();

  try {
    const departamentoId = selectDepartamento.value;
    const palabra = entradaPalabra.value;
    const localizacionValor = entradaLocalizacion.value;
    let url = `${urlAPI}buscar?`;

    if (departamentoId) {
      url += `departamentoId=${departamentoId}&`;
    }

    if (palabra) {
      url += `palabra=${palabra}&`;
    }

    if (localizacionValor) {
      url += `localizacion=${localizacionValor}&`;
    }

    url = url.replace(/&$/, ''); 

    const respuesta = await fetch(url);
    const data = await respuesta.json();

    if (data.length > 0) {
      idsObjetos = data;
      totalPaginas = Math.ceil(idsObjetos.length / 20);
      paginaActual = 1;
      mostrarPagina(paginaActual);
      actualizarBotones();
    } else {
      contenedorTarjetas.innerHTML = 'No se encontraron elementos.';
    }
  } catch (error) {
    console.error('Error al buscar el elemento', error);
  }
}

async function mostrarPagina(pagina) {
  const inicio = (pagina - 1) * 20;
  const fin = inicio + 20;
  const objetosPagina = idsObjetos.slice(inicio, fin);

  contenedorTarjetas.innerHTML = '';

  for (const objetoID of objetosPagina) {
    const objetoRespuesta = await fetch(`${urlAPI}objeto/${objetoID}`);
    const objetoData = await objetoRespuesta.json();

    crearTarjeta(objetoData);
  }

  paginaActualTexto.textContent = paginaActual;
}

// crear tarjetas
function crearTarjeta(objeto) {
  if (!objeto.title || objeto.title === 'undefined') {
    return;
  }

  const tarjeta = document.createElement('div');
  tarjeta.classList.add('tarjeta');

  tarjeta.innerHTML = `
    <img src="${objeto.primaryImageSmall || 'https://via.placeholder.com/150'}" alt="${objeto.title}" class="tarjeta-img-superior">
    <div class="cuerpo-tarjeta">
      <h5 class="titulo-tarjeta">${objeto.title}</h5>
      <p class="texto-tarjeta">Cultura: ${objeto.culture}</p>
      <p class="texto-tarjeta">Dinastía: ${objeto.dynasty}</p>
      <p class="texto-tarjeta fecha-tarjeta" style="display: none;">Fecha: ${objeto.objectDate || objeto.period || 'Desconocido'}</p>
    </div>
  `;

  tarjeta.addEventListener('mouseenter', () => {
    const fechaTarjeta = tarjeta.querySelector('.fecha-tarjeta');
    fechaTarjeta.style.display = 'block';
  });

  tarjeta.addEventListener('mouseleave', () => {
    const fechaTarjeta = tarjeta.querySelector('.fecha-tarjeta');
    fechaTarjeta.style.display = 'none';
  });

  contenedorTarjetas.appendChild(tarjeta);
}

// Función para cargar tarjetas por departamento
async function cargarTarjetasPorDepartamento() {
  const departamentoId = selectDepartamento.value;

  if (!departamentoId) {
    contenedorTarjetas.innerHTML = 'Selecciona un departamento.';
    return;
  }

  try {
    const respuesta = await fetch(`${urlAPI}buscar?departamentoId=${departamentoId}`);
    const data = await respuesta.json();

    if (data.length > 0) {
      idsObjetos = data;
      totalPaginas = Math.ceil(idsObjetos.length / 20);
      paginaActual = 1;
      mostrarPagina(paginaActual);
      actualizarBotones();
    } else {
      contenedorTarjetas.innerHTML = 'No se encontraron elementos para el departamento seleccionado.';
    }
  } catch (error) {
    console.error('Error al cargar los objetos del departamento:', error);
  }
}

// Funciones para paginación
botonAnterior.onclick = () => {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarPagina(paginaActual);
    actualizarBotones();
  }
};

botonSiguiente.onclick = () => {
  if (paginaActual < totalPaginas) {
    paginaActual++;
    mostrarPagina(paginaActual);
    actualizarBotones();
  }
};

function actualizarBotones() {
  botonAnterior.disabled = paginaActual === 1;
  botonSiguiente.disabled = paginaActual === totalPaginas;
}