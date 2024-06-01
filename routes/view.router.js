import { Router } from "express";
import * as messageService from '../service/message.services.js';

const router = (products) => {
    const route = Router();

    route.get('/home', (req, res) => {
        res.render('home', { products });
    });

    route.get('/realtimeproducts', (req, res) => {
        res.render('websocket');
    });

    route.get('/chat', async (req, res) => {
        const messages = await messageService.getAll();
        res.render('chat', {messages});
    });
    return route;
};

export default router;