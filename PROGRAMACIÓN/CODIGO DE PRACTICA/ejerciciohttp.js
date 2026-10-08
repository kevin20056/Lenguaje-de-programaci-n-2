const { response } = require("express");

async function obtenerProductos() {

    const reponse = await fetch('https://api.ejemplo.com/productos', {
        method: 'GET',

        headers: {
            'Authorization': 'Bearer MI_TOKEN_123',

            'Content-Type': 'application/json'
        }
    });

    const datos = await response.json();
    console.log(datos);
}

obtenerProductos();