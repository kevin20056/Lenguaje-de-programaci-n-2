

const exit = document.querySelector("#div-exit");

function show(html) {
  exit.className = "okey";
  exit.innerHTML = html;
}
function error(data) {
  exit.className = "error";
  exit.textContent = data;
}
function loading() {
  exit.className = "loading";
  exit.textContent = "loading…";
}

function idUser() {
  return document.querySelector("#id-user").value;
}

/* ── Lo que se escribe en vivo ───────────────────────────────────────── */

async function search() {
  loading();

    try {
        
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/` + idUser());

    if (!response.ok) {
      error(`El servidor respondió ${response.status}. No existe ese usuario.`);
      return;
    }

    const user = await response.json();
    show(`
      <p class="big">Nombre: ${user.name}</p>
      <p>Email: ${user.email}</p>
      <p>${user.address.city}</p>
      <p>${user.phone}</p>
      <p>${user.company.name}</p>
      `);
    console.log(user);
    console.log(response.status, response.ok);
  } catch (exception) {
    error(`No hay conexión con el servidor. ${exception.message}`);
    }
}
