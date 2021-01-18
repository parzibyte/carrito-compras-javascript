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
        const productos = this.productos;
        return productos.find(producto => producto.id === id);
    }

    obtenerConteo() {
        return this.productos.length;
    }


}