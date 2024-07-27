import Controllers from "./class.controller.js";
import ProductService from "../service/product.services.js";
const prodService = new ProductService();

export default class ProductController extends Controllers {
    constructor(){
        super(prodService);
    }
};