export default class ProductResDTO {
    constructor(prod){
        this.nombre = prod.name;
        this.precio = prod.price;
        this.descripcion = prod.descripction;
        this.fechaDeConsulta = new Date().toLocaleDateString();
        this.disponibilidad = prod.stock > 0 ? 'SI' : 'NO'
    }
}