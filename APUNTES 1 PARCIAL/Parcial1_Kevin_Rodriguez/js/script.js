/* ── Ayudantes ya escritos. No hace falta tocarlos. ──────────────────── */

const salida = document.querySelector("#salida");
const galeria = document.querySelector("#galeria");

function mostrar(texto) {
  salida.className = "bien";
  salida.textContent = texto;
}
function tarjetas(html) {
  galeria.innerHTML = html;
}
function error(texto) {
  salida.className = "error";
  salida.textContent = texto;
  galeria.innerHTML = "";
}
function cargando() {
  salida.className = "cargando";
  salida.textContent = "Cargando…";
  galeria.innerHTML = "";
}

function textoBuscado() {
  return document.querySelector("#texto").value.trim();
  
}

/* ── SU TRABAJO EMPIEZA AQUÍ ─────────────────────────────────────────── */

async function buscar() {
    {
    //1. Avisar que está cargando  ANTES de pedir nada
    cargando();
    //Pedir  https://rickandmortyapi.com/api/character/?name=<texto>
    try {
        const r = await fetch(`https://rickandmortyapi.com/api/character/?name=${textoBuscado()}`);
        //Si el servidor responde con error  ->  decirlo CON EL NÚMERO y salir
        if (!r.ok) {
            error(`El servidor respondió ${r.status}`);
            return;
        }
        //Si el servidor responde bien  ->  leer la respuesta como JSON
        const data = await r.json();
        //Si el JSON tiene un campo "error"  ->  decirlo y salir
        if (data.error) {
            error(data.error);
            return;
        }

        mostrar(`Se encontraron ${data.info.count} personajes`);

        const html = data.results
            .map(p => `
                <div class="tarjeta">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="cuerpo">
                        <h3>${p.name}</h3>
                        <span class="estado ${p.status}">${p.status} · ${p.species}</span>
                        <p>Origen: ${p.origin.name}</p>
                        <p>${p.episode.length} episodios</p>
                    </div>
                </div>
            `)
            .join("");

        tarjetas(html);

    } catch (e) {
        error("No se pudo conectar con el servidor");
    }
}
}