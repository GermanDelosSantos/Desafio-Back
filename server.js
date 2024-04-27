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

app.post("/products", async (req, res) =>{
    try {
        const products = await productManager.addProduct(req.body);
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({msg: error.message});
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