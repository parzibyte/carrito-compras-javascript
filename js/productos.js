/*

  ____          _____               _ _           _       
 |  _ \        |  __ \             (_) |         | |      
 | |_) |_   _  | |__) |_ _ _ __ _____| |__  _   _| |_ ___ 
 |  _ <| | | | |  ___/ _` | '__|_  / | '_ \| | | | __/ _ \
 | |_) | |_| | | |  | (_| | |   / /| | |_) | |_| | ||  __/
 |____/ \__, | |_|   \__,_|_|  /___|_|_.__/ \__, |\__\___|
         __/ |                               __/ |        
        |___/                               |___/         
    
____________________________________
/ Si necesitas ayuda, contáctame en \
\ https://parzibyte.me               /
 ------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
Creado por Parzibyte (https://parzibyte.me).
------------------------------------------------------------------------------------------------
Si el código es útil para ti, puedes agradecerme siguiéndome: https://parzibyte.me/blog/sigueme/
Y compartiendo mi blog con tus amigos
También tengo canal de YouTube: https://www.youtube.com/channel/UCroP4BTWjfM0CkGB6AFUoBg?sub_confirmation=1
------------------------------------------------------------------------------------------------
*/
const $cuerpoTabla = document.querySelector("#cuerpoTabla");

const obtenerProductos = async () => {
    // Es una petición GET, no necesitamos indicar el método ni el cuerpo
    const respuestaRaw = await fetch("obtener_productos.php");
    const productos = await respuestaRaw.json();
    // Limpiamos la tabla
    $cuerpoTabla.innerHTML = "";
    // Ahora ya tenemos a los productos. Los recorremos
    for (const producto of productos) {
        // Vamos a ir adjuntando elementos a la tabla.
        const $fila = document.createElement("tr");
        // La celda del nombre
        const $celdaNombre = document.createElement("td");
        // Colocamos su valor y lo adjuntamos a la fila
        $celdaNombre.innerText = producto.nombre;
        $fila.appendChild($celdaNombre);
        // Lo mismo para lo demás
        const $celdaDescripcion = document.createElement("td");
        $celdaDescripcion.innerText = producto.descripcion;
        $fila.appendChild($celdaDescripcion);
        const $celdaPrecio = document.createElement("td");
        $celdaPrecio.innerText = producto.precio;
        $fila.appendChild($celdaPrecio);
        // Extraer el id del producto en el que estamos dentro del ciclo
        const idProducto = producto.id;
        // Link para eliminar
        const $linkEditar = document.createElement("a");
        $linkEditar.href = "./editar_producto.php?id=" + idProducto;
        $linkEditar.innerHTML = `<i class="fa fa-edit"></i>`;
        $linkEditar.classList.add("button", "is-warning");
        const $celdaLinkEditar = document.createElement("td");
        $celdaLinkEditar.appendChild($linkEditar);
        $fila.appendChild($celdaLinkEditar);

        // Para el botón de eliminar primero creamos el botón, agregamos su listener y luego lo adjuntamos a su celda
        const $botonEliminar = document.createElement("button");
        $botonEliminar.classList.add("button", "is-danger")
        $botonEliminar.innerHTML = `<i class="fa fa-trash"></i>`;
        $botonEliminar.onclick = async () => {

            const respuestaConfirmacion = await Swal.fire({
                title: "Confirmación",
                text: "¿Eliminar el producto? esto no se puede deshacer",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });
            if (respuestaConfirmacion.value) {
                const url = `./eliminar_producto.php?id=${idProducto}`;
                const respuestaRaw = await fetch(url, {
                    method: "DELETE",
                });
                const respuesta = await respuestaRaw.json();
                if (respuesta) {
                    Swal.fire({
                        icon: "success",
                        text: "Producto eliminado",
                        timer: 700, // <- Ocultar dentro de 0.7 segundos
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "El servidor no respondió con una respuesta exitosa",
                    });
                }
                // De cualquier modo, volver a obtener los productos para refrescar la tabla
                obtenerProductos();
            }
        };
        const $celdaBoton = document.createElement("td");
        $celdaBoton.appendChild($botonEliminar);
        $fila.appendChild($celdaBoton);
        // Adjuntamos la fila a la tabla
        $cuerpoTabla.appendChild($fila);
    }
};

// Y cuando se incluya este script, invocamos a la función
obtenerProductos();