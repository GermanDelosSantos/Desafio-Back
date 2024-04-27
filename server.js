import express from 'express'
import ProductManager from '../manager/manager.js?'

const productManager = new ProductManager();

const app = express();

app.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

})

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

app.get("/products/pId", async (req,res) =>{
    try {
        const {pId} = req.params;
        const product = await productManager.getProduct(pId);
        if (!product) res.status(404).json({msg: "Seguro que ese era el id?"});
        else res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});


const PORT = 8080

app.listen(PORT, ()=> console.log((`Puert ok on ${PORT}`)))