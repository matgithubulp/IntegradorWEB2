const params = new URLSearchParams(window.location.search);
const images = params.get('images');

// Convertir la cadena de imágenes en un array
if (images) {
  const imageUrls = images.split(',');

  const galeria = document.getElementById('galeria');

  // Crear elementos de imagen y añadirlos a la galería
  imageUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Imagen adicional';
    img.classList.add('imagen-adicional');
    galeria.appendChild(img);
  });
} else {
  const galeria = document.getElementById('galeria');
  galeria.innerHTML = '<p>No hay imágenes disponibles.</p>';
}