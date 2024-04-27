import fs from 'fs'
import { v4 as uuidv4} from 'uuid'

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = this.loadProductsSync();
    }

    async getProducts() {
        return this.products;
    }
    loadProductsSync() {
        try {
            if (fs.existsSync(this.path)) {
                const data = fs.readFileSync(this.path, "utf-8");
                return JSON.parse(data);
             }
                 } catch (error) {
                     console.error("Error al cargar los productos", error);
                 }
     }

    async saveProducts() {
        try {
            await fs.promises.writeFile(this.path,JSON.stringify(this.products, null, 2));
            console.log("Products saved successfully.");
            } catch (error) {
            console.error("Error al guardar los Productos", error);
        }
    }   

    updateProduct(productId, updatedFields) {
        const updatedProducts = this.products.map((product) => {
            if (product.id === productId) {
                 return { ...product, ...updatedFields };
                 } else {
                return product;
            }
        });

        this.products = updatedProducts;

        this.saveProducts();

        console.log("Producto actualizado correctamente");

    }

    deleteProduct(productId) {
        const index = this.products.findIndex((product) => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log("Producto eliminado correctamente");
        } else {
            console.log("No se encontró ningún producto con el ID proporcionado");
        }
    }

    addProduct(title, description, price, thumbnail, stock, code) {
        if (!title || !description || !price || !thumbnail || !stock || !code) {
            console.log("Todos los campos son necesarios");
            return;
        }

        if (this.products.some((product) => product.code === code)) {
            console.log("Ya existe un producto con el mismo codigo");
            return;
        }

        const newProduct = {
            id: uuidv4(),
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
        };
        this.products.push(newProduct);
        this.saveProducts();
        console.log("Producto añadido correctamente", newProduct);
    }

    getMaxId() {
        return this.products.reduce(
            (maxId, product) => Math.max(maxId, product.id),0);
    }

    getProduct(idProduct) {
        return this.products.find((product) => product.id === idProduct);
    }
}
