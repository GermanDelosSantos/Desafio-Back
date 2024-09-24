import { Router } from "express";
import { checkAuth } from "../midlewares/checkJwt.js";
import { checkAdmin } from "../midlewares/checkAdmin.js";
import CartController from '../controllers/cart.controllers.js'
import TicketController from "../controllers/ticket.controller.js";
const ticketController = new TicketController();
const controller = new CartController();


const router = Router();

router.post('/purchase', [checkAuth], ticketController.generateTicket);

router.get("/", [checkAuth, checkAdmin], controller.getAll);

router.get("/:id", [checkAuth], controller.getById);

router.post("/", [checkAuth, checkAdmin], controller.create);

router.put("/:id", [checkAuth, checkAdmin], controller.update);

router.delete("/:id", [checkAuth, checkAdmin], controller.delete);

router.post("/products/:idProd", [checkAuth], controller.addProductToCart);

router.delete("/products/:idProd", [checkAuth], controller.removeProdToCart);

router.put("/products/:idProd", [checkAuth], controller.updateProdQuantityToCart);

router.delete("/clear", [checkAuth], controller.clearCart);



export default router;