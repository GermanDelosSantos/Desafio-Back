import { Router } from "express";
import { __dirname } from "../utils.js";
import { productValidator } from "../midlewares/productValidator.js";
import ProductManager from "../manager/manager.js";
import express from 'express'
import handlebars from 'express-handlebars'


const app = express();


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


const router = Router();
const productManager = new ProductManager(`${__dirname}/db/products.json`);




router.get("/", async (req, res, next) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
});

router.get("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const product = await productManager.getProductByID(idProd);
    if (!product) res.status(404).json({ msg: "product not found" });
    else res.status(200).json(product);
  } catch (error) {
    res.status(500).json({msg: error.message});  }
});

router.post("/", productValidator, async (req, res) => {
  try {
    console.log(req.body);
    const product = req.body;
    const newProduct = await productManager.creatProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({msg: error.message});  }
});

router.put("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const prodUpd = await productManager.updateProduct(req.body, idProd);
    if (!prodUpd) res.status(404).json({ msg: "Error updating prod" });
    res.status(200).json(prodUpd);
  } catch (error) {
    res.status(500).json({msg: error.message});  }
});

router.delete("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const delProd = await productManager.deleteProduct(idProd);
    if (!delProd) res.status(404).json({ msg: "Error delete product" });
    else
      res
        .status(200)
        .json({ msg: `product id: ${idProd} deleted successfully` });
  } catch (error) {
    res.status(500).json({msg: error.message});  }
});

router.delete("/", async (req, res) => {
  try {
    await productManager.deleteFile();
    res.send("products deleted successfully");
  } catch (error) {
    res.status(500).json({msg: error.message});  }
});

app.get('/realtimeproducts', (req, res)=>{
  res.render('websocket')
})

export default router;