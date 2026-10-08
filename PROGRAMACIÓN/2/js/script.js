console.log("Ingreso al script");

async function fetchInfo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  console.log(response.status);
  response.ok;
  response.headers.get("content-type");

  //await response.json();

  response.json().then((data) => {
    console.log(data);
    
    let title = document.querySelector("#id-title");
    title.innerHTML = data.title;

    let user = document.querySelector("#id-user");
    user.innerHTML = data.userId;

    let body = document.querySelector("#body-user");
    body.innerHTML = data.body;
  });
}

console.log("Antes de llamar a la función");
fetchInfo();
