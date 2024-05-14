import { Router } from "express";

const router = (products) => {
    const route = Router();

    route.get('/home', (req, res) => {
        res.render('home', { products });
    });

    route.get('/realtimeproducts', (req, res) => {
        res.render('websocket');
    });

    return route;
};

export default router;