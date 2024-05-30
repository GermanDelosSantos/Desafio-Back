import { Router } from "express";
import * as Controller from "../controllers/cart.controllers.js";

const router = Router();

router.post("/:idCart/product/:idProd", Controller.addProductToCart);
router.post("/", Controller.create);
router.get("/:idCart", Controller.getById);
router.get("/", Controller.getAll);
router.delete(":idCart", Controller.remove);



export default router;