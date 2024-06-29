function menu() {
    var menu = document.getElementById("MenuMovil")
    menu.classList.toggle("AbrirMenuMovil")
}

urlBase = 'https://api.yumserver.com/16716/products';

ObtenerProductos()

function CrearNuevoProducto() {
    let producto = {
        titulo: document.getElementById("titulo").value,
        precioPeso: document.getElementById("precioPeso").value,
        precioDolar: document.getElementById("precioDolar").value,
        fecha: document.getElementById("fecha").value
    }
    fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            if (data === 'OK') {
                alert("EL producto se guardo correctamente");
            }
            else {
                alert("El producto no se pudo guardar");
            }

            ObtenerProductos()
            producto = "";

            document.getElementById("titulo").value = "",
            document.getElementById("precioPeso").value = "",
            document.getElementById("precioDolar").value = "",
            document.getElementById("fecha").value = ""
        })
        .catch(error => console.error('Error:', error))
}

function ObtenerProductos() {
    fetch(urlBase)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let html = "";

            for (let i = 0; i < data.length; i++) {
                html += `
            <tr>
                <td>${data[i].titulo}</td>
                <td>${data[i].precioPeso}</td>
                <td>${data[i].precioDolar}</td>
                <td>${data[i].fecha}</td>
                <td><button class="accion1" id="${data[i].idcod}" onclick="EliminarProducto(id)">Eliminar</button></td>
                <td><button class="accion2" id="${data[i].idcod}" onclick="Buscar(id)">Modificar</button></td>
            </tr>`;
            }
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(error => console.error('Error', error))
}

function EliminarProducto(idcodEliminar) {
    if(confirm("¿Estas seguro que deseas eliminar este articulo?"))
    fetch(urlBase, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idcod: idcodEliminar
        })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            if (data === 'OK') {
                alert("El producto se elimino");
                ObtenerProductos()
            }
            else {
                alert("No se pudo Eliminar")
            }
        })
        .catch(error => console.error('Error:', error));
}

function ModificarProducto() {
    let producto = {
        idcod: document.getElementById("idModificar").value,
        titulo: document.getElementById("tituloModificar").value,
        precioPeso: document.getElementById("precioPesoModificar").value,
        precioDolar: document.getElementById("precioDolarModificar").value,
        fecha: document.getElementById("fechaModificar").value
    }
    fetch(urlBase, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)

            if (data === 'OK') {
                alert("El producto se ha modificado")
                ObtenerProductos()
            }
            else {
                alert("El producto no se ha podido modificar")
            }

            document.getElementById("idModificar").value = "",
            document.getElementById("tituloModificar").value = "",
            document.getElementById("precioPesoModificar").value = "",
            document.getElementById("precioDolarModificar").value = "",
            document.getElementById("fechaModificar").value = ""
        })
        .catch(error => console.error('Error:', error));
}

function Buscar(idBuscar) {
    fetch(urlBase)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            for (let i = 0; i < data.length; i++) {
                if (data[i].idcod == idBuscar) {
                    document.getElementById("idModificar").value = data[i].idcod
                    document.getElementById("tituloModificar").value = data[i].titulo
                    document.getElementById("precioPesoModificar").value = data[i].precioPeso
                    document.getElementById("precioDolarModificar").value = data[i].precioDolar
                    document.getElementById("fechaModificar").value = data[i].fecha

                }
            }
        })
        .catch(error => console.error('Error', error))
}