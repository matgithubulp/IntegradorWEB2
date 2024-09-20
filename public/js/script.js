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
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block'; // Mostrar el spinner

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

    url = url.replace(/&$/, ''); // Elimina el último ampersand
    console.log('URL de búsqueda:', url); // Verifica la URL

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
  } finally {
    spinner.style.display = 'none'; // Ocultar el spinner al final
  }
}

async function mostrarPagina(pagina) {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block'; // Mostrar el spinner

  const inicio = (pagina - 1) * 20;
  const fin = inicio + 20;
  const objetosPagina = idsObjetos.slice(inicio, fin);
  
  contenedorTarjetas.innerHTML = '';

  let tarjetasCreadas = 0; 

  // Crear todas las tarjetas en paralelo
  const promesas = objetosPagina.map(async (objetoID) => {
    const objetoRespuesta = await fetch(`${urlAPI}objeto/${objetoID}`);
    const objetoData = await objetoRespuesta.json();

    if (objetoData.title && objetoData.primaryImageSmall) {
      crearTarjeta(objetoData);
      tarjetasCreadas++;
    } else {
      crearTarjeta({
        title: objetoData.title || 'Sin título',
        primaryImageSmall: objetoData.primaryImageSmall || 'http://placeholder-image.com/api/placeholderimage?width=150&fontweight=false&fontstyle=true&fontdecoration=false&height=150&text=SIUUUUUUUUU&color=%230a0a0a&fontFamily=arial&fontSize=small&background=%233f8857',
        culture: objetoData.culture || 'Desconocido',
        dynasty: objetoData.dynasty || 'Desconocido',
        objectDate: objetoData.objectDate || objetoData.period || 'Desconocido'
      });
      tarjetasCreadas++;
    }
  });

  // Esperar a que se creen todas las tarjetas
  await Promise.all(promesas);
  
  paginaActualTexto.textContent = paginaActual;
  spinner.style.display = 'none'; // Ocultar el spinner al final
}

// crear tarjetas
function crearTarjeta(objeto) {
  if (!objeto.title || objeto.title === 'undefined') {
    return;
  }

  const tarjeta = document.createElement('div');
  tarjeta.classList.add('tarjeta');

  const fecha = objeto.objectDate || objeto.period || 'Desconocido';
  tarjeta.setAttribute('title', `Fecha: ${fecha}`);

  // Si dynasty o culture están vacíos o no están presentes, se les asigna un valor predeterminado
  
  const dinastia = objeto.dynasty || 'Desconocido';
  const cultura = objeto.culture || 'Desconocido';
  console.log(dinastia, cultura);
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