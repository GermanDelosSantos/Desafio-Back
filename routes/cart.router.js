import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";

const router = Router();

router.post("/:idCart/product/:idProd", controller.addProdToCart);
router.post("/", controller.create);
router.get("/:idCart", controller.getById);
router.get("/", controller.getAll);
router.delete(":idCart", controller.remove);

router.delete("/:idCart/product/:idProd", controller.removeProdToCart);

router.put("/:idCart/product/:idProd", controller.updateProdQuantityToCart);

router.delete("/clear/:idCart", controller.clearCart);



export default router;