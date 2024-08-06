import Services from "./class.services.js";
import ProductDaoMongo from "../persistence/daos/mongodb/product.dao.js";
import { generateFakerProduct } from '../utils/product.utils.js'
const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }

    createProductsMock = async (cant = 100) => {
        try {
          const productsArray = [];
          for (let i = 0; i < cant; i++) {
            const product = generateFakerProduct();
            productsArray.push(product);
          }
          return await prodDao.create(productsArray);
        } catch (error) {
          throw new Error(error);
        }
      };

};