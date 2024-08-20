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
      // const { idCart } = req.params;
      // console.log(req.user)
      const { cart } = req.user;
      const { idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(
        cart,
        idProd,
      );
      if (!newProdToUserCart) createResponse(res, 404, { msg: "Error add product to cart" });
      else createResponse(res, 200, newProdToUserCart);
    } catch (error) {
      next(error);
    }
  };

  async addProductToCart(req, res, next) {
    try {
      const { cart} = req.user;
      const {idProd} = req.params;
      // const { cartId, productId } = req.body;
      const userEmail = req.user.email;
  
      const result = await cartService.addProdToCart(
        cart, idProd, userEmail
      );
  
      if (!result) createResponse(res, 404, {msg: 'Error add product to cart'});
      else createResponse(res, 200, result);
    } catch (error) {
      console.error('Error en addProductToCart:', error.message); // Agrega más detalles al error
      next(error);
    }
  }


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