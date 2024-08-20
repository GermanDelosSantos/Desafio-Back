import Services from "./class.services.js";
import ProductDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();
import CartDaoMongoDB from "../persistence/daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();
import UserDao from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDao();

import {logger} from "../logs/logger.js";


export default class CartServices extends Services {
  constructor() {
    super(cartDao);
  }


  // addProdToCart = async (cartId, prodId) => {
  //   try {
  //     const existCart = await this.getById(cartId);
  //     if (!existCart) return null;
  
  //     const existProd = await prodDao.getById(prodId);
  //     if (!existProd) return null;

  //     return await this.dao.addProdToCart(cartId, prodId);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  addProdToCart = async (cartId, prodId, userEmail) => {
    try {
      console.log('Buscando producto con ID:', prodId);
      const product = await prodDao.getById(prodId);
      console.log('Producto encontrado:', product);
  
      if (!product) {
        throw new Error('Producto no encontrado');
      }
  
      if (product.owner === userEmail) {
        throw new Error('No puedes agregar tu propio producto al carrito');
      }
  
      const existCart = await this.getById(cartId);
      if (!existCart) return null;
  
      const existProd = await prodDao.getById(prodId);
      if (!existProd) return null;
  
      return await this.dao.addProdToCart(cartId, prodId);
    } catch (error) {
      console.error('Error en addProdToCart:', error.message);
      throw new Error(error.message);
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await this.getById(cartId);
      if(!existCart) return null;
      const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
      if (!existProdInCart) return null;
      return await this.dao.removeProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      const existCart = await this.getById(cartId);
      logger.info("existCart-->", existCart);
      if(!existCart) return null;
  
      const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
      logger.info("existProd-->", existProdInCart);
      if (!existProdInCart) return null;
  
      return await this.dao.updateProdQuantityToCart(cartId, prodId, quantity);
    } catch (error) {
      throw new Error(error);
    }
  };

  clearCart = async (cartId) => {
    try {
      const existCart = await this.getById(cartId);
      logger.info("existCart-->", existCart);
      if (!existCart) return null;
      return await this.dao.clearCart(cartId);
    } catch (error) {
      throw new Error(error);
    }
  };
}