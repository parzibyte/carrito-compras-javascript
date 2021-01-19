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
class Carrito {
    constructor(clave) {
        this.clave = clave || "productos";
        this.productos = this.obtener();
    }

    agregar(producto) {
        if (!this.existe(producto.id)) {
            this.productos.push(producto);
            this.guardar();
        }
    }

    quitar(id) {
        const indice = this.productos.findIndex(p => p.id === id);
        if (indice != -1) {
            this.productos.splice(indice, 1);
            this.guardar();
        }
    }

    guardar() {
        localStorage.setItem(this.clave, JSON.stringify(this.productos));
    }

    obtener() {
        const productosCodificados = localStorage.getItem(this.clave);
        return JSON.parse(productosCodificados) || [];
    }

    existe(id) {
        return this.productos.find(producto => producto.id === id);
    }

    obtenerConteo() {
        return this.productos.length;
    }


}