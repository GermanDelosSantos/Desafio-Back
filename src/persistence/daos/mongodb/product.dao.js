import MongoDao from "../mongo.dao.js";
import { ProductModel } from './models/product.model.js';
const MONGO_URL = 'mongodb+srv://noiconuf:admin@cluster0.qu7hol7.mongodb.net/coderBack?retryWrites=true&w=majority&appName=Cluster0' 
import { logger } from "../../../logs/logger.js";

export default class ProductDaoMongo extends MongoDao {
    constructor(){
        super(ProductModel);
    }


};