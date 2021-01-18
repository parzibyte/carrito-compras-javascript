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
const $nombre = document.querySelector("#nombre"),
    $descripcion = document.querySelector("#descripcion"),
    $precio = document.querySelector("#precio"),
    $btnGuardar = document.querySelector("#btnGuardar");

$btnGuardar.onclick = async () => {
    const nombre = $nombre.value,
        descripcion = $descripcion.value,
        precio = parseFloat($precio.value);
    // Pequeña validación, aunque debería hacerse del lado del servidor igualmente, aquí es pura estética
    if (!nombre) {
        return Swal.fire({
            icon: "error",
            text: "Escribe el nombre",
            timer: 700, // <- Ocultar dentro de 0.7 segundos
        });
    }
    if (!descripcion) {
        return Swal.fire({
            icon: "error",
            text: "Escribe la descripción",
            timer: 700, // <- Ocultar dentro de 0.7 segundos
        });
    }

    if (!precio) {
        return Swal.fire({
            icon: "error",
            text: "Escribe el precio",
            timer: 700, // <- Ocultar dentro de 0.7 segundos
        });
    }
    // Lo que vamos a enviar a PHP
    const cargaUtil = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        // Nota: podríamos hacerlo más simple, y escribir:
        // nombre,
        // En lugar de:
        // nombre: nombre
        // Pero eso podría confundir al principiante
    };
    // Codificamos...
    const cargaUtilCodificada = JSON.stringify(cargaUtil);
    // Enviamos
    try {
        const respuestaRaw = await fetch("guardar_producto.php", {
            method: "POST",
            body: cargaUtilCodificada,
        });
        // El servidor nos responderá con JSON
        const respuesta = await respuestaRaw.json();
        if (respuesta) {

            // Y si llegamos hasta aquí, todo ha ido bien
            Swal.fire({
                icon: "success",
                text: "Producto guardado",
                timer: 700, // <- Ocultar dentro de 0.7 segundos
            });
            // Limpiamos el formulario
            $nombre.value = $descripcion.value = $precio.value = "";
        } else {
            Swal.fire({
                icon: "error",
                text: "El servidor no envió una respuesta exitosa",
            });
        }
    } catch (e) {
        // En caso de que haya un error
        Swal.fire({
            icon: "error",
            title: "Error de servidor",
            text: "Inténtalo de nuevo. El error es: " + e,
        });
    }
};