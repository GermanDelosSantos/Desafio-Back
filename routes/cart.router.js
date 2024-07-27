import { Router } from "express";
import { checkAuth } from "../midlewares/checkJwt.js";
import { checkAdmin } from "../midlewares/checkAdmin.js";
import CartController from '../controllers/cart.controllers.js'
const controller = new CartController();


const router = Router();

router.get("/", [checkAuth, checkAdmin], controller.getAll);

router.get("/:id", [checkAuth], controller.getById);

router.post("/", [checkAuth, checkAdmin], controller.create);

router.put("/:id", [checkAuth, checkAdmin], controller.update);

router.delete("/:id", [checkAuth, checkAdmin], controller.delete);

router.post("/products/:idProd", [checkAuth], controller.addProdToCart);

router.delete("/:idCart/products/:idProd", [checkAuth], controller.removeProdToCart);

router.put("/:idCart/products/:idProd", [checkAuth], controller.updateProdQuantityToCart);

router.delete("/clear/:idCart", [checkAuth], controller.clearCart);



export default router;