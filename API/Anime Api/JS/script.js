const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');
const inputBusqueda = document.getElementById('busqueda');

// Evento del formulario
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const busqueda = inputBusqueda.value.trim();

  if (!busqueda) return mostrarMensaje('Por favor, escribe un nombre.');

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${busqueda}`);
    if (!res.ok) throw new Error('Error en la búsqueda');

    const { data } = await res.json();
    data.length
      ? mostrarAnimes(data.slice(0, 5))
      : mostrarMensaje('No se encontró ningún anime con ese nombre.');
  } catch (error) {
    mostrarMensaje(`Hubo un error al buscar el anime. ${error.message}`);
    console.error(error);
  }
});

// Mostrar mensaje en el contenedor
const mostrarMensaje = (mensaje) => (resultado.textContent = mensaje);

// Mostrar animes
const mostrarAnimes = (animes) => {
  resultado.innerHTML = animes
    .map((anime) => crearCardAnime(anime).outerHTML)
    .join('');
};

// Crear tarjeta de anime
const crearCardAnime = (anime) => {
  const div = document.createElement('div');
  div.className = 'anime-card';
  const generos = anime.genres.map((g) => g.name).join(', ');
  const generoPrincipal = anime.genres[0]?.name || 'Sin clasificar';

  div.innerHTML = `
    <h2>${anime.title}</h2>
    <img src="${anime.images.jpg.image_url}" alt="${anime.title}" width="200">
    <p><strong>Géneros:</strong> ${generos}</p>
    <p>${anime.synopsis?.substring(0, 200) || 'Sin descripción disponible'}...</p>
    <button class="favorito-btn" data-nombre="${anime.title}" data-genero="${generoPrincipal}">
      Añadir a Favoritos
    </button>
  `;

  div.querySelector('.favorito-btn').addEventListener('click', () =>
    añadirAFavoritos(anime.title, generoPrincipal)
  );

  return div;
};

// Añadir a favoritos
const añadirAFavoritos = (nombre, genero) => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || {};
  favoritos[genero] = favoritos[genero] || [];

  if (!favoritos[genero].includes(nombre)) {
    favoritos[genero].push(nombre);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert(`${nombre} añadido a favoritos en la categoría ${genero}`);
  } else {
    alert(`${nombre} ya está en favoritos.`);
  }
};