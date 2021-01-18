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
const $cuerpoTabla = document.querySelector("#cuerpoTabla"),
    $celdaTotal = document.querySelector("#celdaTotal"),
    $btnTerminarCompra = document.querySelector("#btnTerminarCompra"),
    c = new Carrito();

$btnTerminarCompra.onclick = () => {
    // Aquí haz lo que gustes con el carrito
    const productos = c.obtener();
    console.log(productos);
};
const refrescarCarrito = () => {
    const productos = c.obtener();
    // Limpiamos la tabla
    $cuerpoTabla.innerHTML = "";
    // Ahora ya tenemos a los productos. Los recorremos
    let total = 0;
    for (const producto of productos) {
        total += parseFloat(producto.precio);
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

        // Para el botón de eliminar primero creamos el botón, agregamos su listener y luego lo adjuntamos a su celda
        const $botonEliminar = document.createElement("button");
        $botonEliminar.classList.add("button", "is-danger")
        $botonEliminar.innerHTML = `<i class="fa fa-trash"></i>`;
        $botonEliminar.onclick = async () => {
            c.quitar(idProducto);
            obtenerProductos();
        };
        const $celdaBoton = document.createElement("td");
        $celdaBoton.appendChild($botonEliminar);
        $fila.appendChild($celdaBoton);
        // Adjuntamos la fila a la tabla
        $cuerpoTabla.appendChild($fila);
    }
    $celdaTotal.textContent = total.toString();
};

// Y cuando se incluya este script, invocamos a la función
refrescarCarrito();