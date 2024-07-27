import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';
import { checkAuth } from '../midlewares/checkJwt.js';
const controller = new TicketController();

const router = Router();

router.post('/purchase', [checkAuth], controller.generateTicket)

export default router;