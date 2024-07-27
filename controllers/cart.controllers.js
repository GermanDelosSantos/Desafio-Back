import Controller from "./class.controller.js";
import CartServices from "../service/cart.services.js";
import { createResponse } from "../utils.js";

const cartService = new CartServices();

export default class CartController extends Controller {
constructor(){super(CartServices)}


addProdToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const newProdToUserCart = await service.addProdToCart(
      idCart,
      idProd,
    );
    if (!newProdToUserCart) res.json({ msg: "Product | Cart not exist" });
    else res.json(newProdToUserCart);
  } catch (error) {
    next(error.message);
  }
};

removeProdToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const delProdToUserCart = await service.removeProdToCart(
      idCart,
      idProd,
    );
    if (!delProdToUserCart) res.json({ msg: "Product | Cart not exist" });
    else res.json({msg: `product ${idProd} deleted to cart`});
  } catch (error) {
    next(error.message);
  }
};

updateProdQuantityToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const { quantity } = req.body;
    const  updateProdQuantity = await service.updateProdQuantityToCart(
      idCart,
      idProd,
      quantity
    );
    if (!updateProdQuantity) res.json({ msg: "Error update product quantity to cart" });
    else res.json(updateProdQuantity);
  } catch (error) {
    next(error.message);
  }
};
clearCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const clearCart = await service.clearCart(
      idCart,
    );
    if (!clearCart) res.json({ msg: "Error clear cart" });
    else res.json(clearCart);
  } catch (error) {
    next(error.message);
  }

   };
}



// import * as service from "../service/cart.services.js";

// export const getAll = async (req, res, next) => {
//   try {
//     const response = await service.getAll();
//     res.status(200).json(response);
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const getById = async (req, res, next) => {
//   try {
//     const { idCart } = req.params;
//     console.log(`Fetching cart by ID: ${idCart}`);
//     const cart = await service.getById(idCart);
//     if (!cart) res.status(404).json({ msg: 'Cart not found' });
//     else res.json(cart);
//   } catch (error) {
//     console.error(`Error in getById controller: ${error.message}`);
//     next(error.message);
//   }
// };

// export const create = async (req, res, next) => {
//   try {
//     const newCart = await service.create();
//     if (!newCart) res.status(404).json({ msg: "Error create cart!" });
//     else res.status(200).json(newCart);
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const update = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const cartUpd = await service.update(id, req.body);
//     if (!cartUpd) res.status(404).json({ msg: "Error update cart!" });
//     else res.status(200).json(cartUpd);
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const remove = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const cartDel = await service.remove(id);
//     if (!cartDel) res.status(404).json({ msg: "Error delete cart!" });
//     else res.status(200).json({ msg: `Cart id: ${id} deleted` });
//   } catch (error) {
//     next(error.message);
//   }
// };
