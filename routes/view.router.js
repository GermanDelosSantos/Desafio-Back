import { Router } from "express";
import * as messageService from '../service/message.services.js';
import { isAuth } from "../midlewares/isAuth.js";
// import * as productService from '../service/product.services.js';

const router = (products) => {
    const route = Router();

    route.get('/home', (req, res) => {
        res.render('home', { products });
    });

    // route.get('/realtimeproducts', (req, res) => {
    //     res.render('websocket');
    // });
    // route.get('/realtimeproducts', async (req, res) => {
    //     try {
    //         const products = await productService.getAll();
    //         res.render('websocket', { products });
    //     } catch (error) {
        //         res.status(500).send(error.message);
        //     }
        // });
        
     route.get("/login", (req, res) => {
            res.render("login");
    });
          
     route.get("/register", (req, res) => {
            res.render("register");
    });

    route.get('/profile', (req, res) =>{
        res.render("profile")
    })
          
    route.get("/github-profile", isAuth, (req, res) => {
        console.log("req.user", req.user);
        const user = req.user.toObject();
        res.render("github-profile", { user });
      });


        route.get('/chat', async (req, res) => {
        const messages = await messageService.getAll();
        res.render('chat', {messages});
    });

    
    return route;

};

export default router;