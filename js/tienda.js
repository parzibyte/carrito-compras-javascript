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
const $contenedor = document.querySelector("#contenedor");

const obtenerProductos = async () => {
    // Es una petición GET, no necesitamos indicar el método ni el cuerpo
    const respuestaRaw = await fetch("obtener_productos.php");
    const productos = await respuestaRaw.json();
    // Limpiamos la tabla
    $contenedor.innerHTML = "";
    const c = new Carrito();
    // Ahora ya tenemos a los productos. Los recorremos
    for (const producto of productos) {
        const $div = document.createElement("div");
        $div.classList.add("columns");
        const $columna = document.createElement("div");
        $columna.classList.add("column", "is-full");
        $div.appendChild($columna);
        const $tarjeta = document.createElement("div");
        $tarjeta.classList.add("card");
        $columna.appendChild($tarjeta);
        const $header = document.createElement("header");
        $header.classList.add("card-header");
        const $parrafoNombre = document.createElement("p");
        $parrafoNombre.classList.add("card-header-title", "is-size-4");
        $parrafoNombre.textContent = producto.nombre;
        $header.appendChild($parrafoNombre);
        $tarjeta.appendChild($header);
        const $contenidoTarjeta = document.createElement("div");
        $contenidoTarjeta.classList.add("card-content");
        const $contenido = document.createElement("div");
        $contenido.classList.add("content");
        $contenido.innerText = producto.descripcion;
        $contenidoTarjeta.appendChild($contenido);
        $tarjeta.appendChild($contenidoTarjeta);
        const $encabezadoPrecio = document.createElement("h1");
        $encabezadoPrecio.classList.add("is-size-3");
        $encabezadoPrecio.textContent = producto.precio;
        $contenidoTarjeta.appendChild($encabezadoPrecio);
        if (c.existe(producto.id)) {

            const $spanYaPresenteEnCarrito = document.createElement("span");
            $spanYaPresenteEnCarrito.classList.add("button", "is-success");
            $spanYaPresenteEnCarrito.innerHTML = `<i class="fa fa-check"></i>&nbsp;En el carrito`;
            $contenidoTarjeta.appendChild($spanYaPresenteEnCarrito);

            const $botonQuitar = document.createElement("button");
            $botonQuitar.classList.add("button", "is-danger", "ml-2");
            $botonQuitar.innerHTML = `<i class="fa fa-trash-o"></i>&nbsp;Quitar`;
            $botonQuitar.onclick = () => {
                c.quitar(producto.id);
                obtenerProductos();
            };
            $contenidoTarjeta.appendChild($botonQuitar);
        } else {
            const $botonAgregar = document.createElement("button");
            $botonAgregar.classList.add("button", "is-primary");
            $botonAgregar.innerHTML = `<i class="fa fa-cart-plus"></i>&nbsp;Agregar al carrito`;
            $botonAgregar.onclick = () => {
                c.agregar(producto);
                obtenerProductos();
            };
            $contenidoTarjeta.appendChild($botonAgregar);
        }
        $contenedor.appendChild($div);
    }
};

// Y cuando se incluya este script, invocamos a la función
obtenerProductos();