const params = new URLSearchParams(window.location.search);
const images = params.get('images');


if (images) {
  const imageUrls = images.split(',');

  const galeria = document.getElementById('galeria');


  imageUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Imagen adicional';
    img.classList.add('imagen-adicional');
    galeria.appendChild(img);
  });
} 