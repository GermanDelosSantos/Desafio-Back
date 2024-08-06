import Controllers from "./class.controller.js";
import CartService from '../service/cart.services.js';
import { createResponse } from "../utils.js";
import httpResponse from "../utils/httpresponse.js";
const cartService = new CartService();

export default class CartController extends Controllers{
  constructor(){
    super(cartService)
  }
  addProdToCart = async (req, res, next) => {
    try {

      const { cart } = req.user;
      const { idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(
        cart,
        idProd,
      );
      if (!newProdToUserCart) return httpResponse.NotFound(res, data);
      else return httpResponse.Ok(res, newProdToUserCart);
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.user;
      const { idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) return httpResponse.NotFound(res, data);
      else return httpResponse.Ok(res, idProd);
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.user;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await this.service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) return httpResponse.MissingData(res, data);
      else return httpResponse.Ok(res, updateProdQuantity);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.user;
      const clearCart = await this.service.clearCart(
        idCart,
      );
      if (!clearCart) return httpResponse.NotFound(res, data);
      else return httpResponse.Ok(res, clearCart);
    } catch (error) {
      next(error);
    }
  };

}