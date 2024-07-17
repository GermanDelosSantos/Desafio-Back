import { Router } from "express";
import productRouter from './products.router.js';
import userRouter from './user.router.js';
import cartRouter from './cart.router.js';
import viewRouter from './view.router.js'

export default class MainRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.use('/products', productRouter);
        this.router.use('/users', userRouter);
        this.router.use('/carts', cartRouter);
        this.router.use('/view', viewRouter);
    }

    getRouter(){
        return this.router;
    }
}