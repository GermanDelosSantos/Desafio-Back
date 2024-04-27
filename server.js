import express from 'express'
import ProductManager from './manager/manager.js'

const productManager = new ProductManager("./products.json");

const app = express();


app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const minValue = parseInt(req.query.value);
        
        if (!isNaN(minValue)) {
            let products = await productManager.getProducts();
            products = products.filter(product => product.price > minValue);
            if (!isNaN(limit)) {
                products = products.slice(0, limit);
            }
            res.status(200).json(products);
        } else {
            let products = await productManager.getProducts();
            if (!isNaN(limit)) {
                products = products.slice(0, limit);
            }
            res.status(200).json(products);
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id); // Convertir ID a número
        if (isNaN(productId)) {
            res.status(400).json({ error: 'ID de producto inválido' });
            return;
        }
        const product = await productManager.getProductByID(productId);
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.error('Error al obtener el producto por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

const PORT = 8080

app.listen(PORT, ()=> console.log((`Puert ok on ${PORT}`)))