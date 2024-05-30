import * as service from "../service/cart.services.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    console.log(`Fetching cart by ID: ${idCart}`);
    const cart = await service.getById(idCart);
    if (!cart) res.status(404).json({ msg: 'Cart not found' });
    else res.json(cart);
  } catch (error) {
    console.error(`Error in getById controller: ${error.message}`);
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newCart = await service.create(req.body);
    if (!newCart) res.status(404).json({ msg: 'Error creating cart' });
    else res.json(newCart);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const cartUpd = await service.update(idCart, req.body);
    if (!cartUpd) res.status(404).json({ msg: 'Error updating cart' });
    else res.json(cartUpd);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartDel = await service.remove(id);
    if (!cartDel) res.status(404).json({ msg: 'Error removing cart' });
    else res.json(cartDel);
  } catch (error) {
    next(error.message);
  }
};

export const addProductToCart = async (req, res, next) => {
    try {
      const { idCart, idProd } = req.params;
      const updatedCart = await service.addProductToCart(idCart, idProd);
      if (!updatedCart) {
        res.status(404).json({ msg: 'Error adding product to cart' });
      } else {
        res.json(updatedCart);
      }
    } catch (error) {
        console.error(`Error in addProductToCart: ${error.message}`);
      next(error.message);
    }
  };