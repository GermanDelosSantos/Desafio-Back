import Services from "./class.services.js";
import ProductDaoMongo from "../persistence/daos/mongodb/product.dao.js";

const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }
};