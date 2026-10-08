/* ── Ayudantes ya escritos. No hace falta tocarlos. ──────────────────── */

const salida = document.querySelector("#salida");

function mostrar(html) {
  salida.className = "bien";
  salida.innerHTML = html;
}
function error(texto) {
  salida.className = "error";
  salida.textContent = texto;
}
function cargando() {
  salida.className = "cargando";
  salida.textContent = "Cargando…";
}

function nombre() {
  return document.querySelector("#nombre").value.trim().toLowerCase();
}

/* ── SU TRABAJO EMPIEZA AQUÍ ─────────────────────────────────────────── */

async function buscar() {
  //Analogía: Antes de pedir algo en una tienda, digo: “Espere un momento, ya lo estoy buscando
  cargando();

  try {
    //Analogía: Voy a la tienda, pido Pikachu y guardo la respuesta que me entregan
    const r = await fetch("https://pokeapi.co/api/v2/pokemon/" + nombre());
    //Le pido Pikachu al vendedor. Si me dice “no existe, código 404”, me informa el error y deja de buscar
    if (!r.ok) {
      error(`El servidor repondió ${r.status}`);
      return;
    }
    //Me entregan la información de Pikachu y r.json() la convierte en algo que puedo leer y usar
    const datos = await r.json();

    //Yo ya tengo la información de Pikachu, entonces selecciono sus datos importantes y los muestro en una ficha: nombre, altura, peso, tipos e imagen
    const tipos = datos.types.map((t) => t.type.name).join(", ");

    mostrar(`
      <img src="${datos.sprites.front_default}">
      <p>${datos.name}</p>
      <p>Altura: ${datos.height / 10} m</p>
      <p>Peso: ${datos.weight / 10} kg</p>
      <p>Tipos: ${tipos}</p>
    `);
  } catch (e) {
    //Si no tengo conexión, aviso que no pude comunicarme con la tienda en lugar de seguir como si nada
      error(`No hay conexión con el servidor. ${e.message}`);
  }
}
