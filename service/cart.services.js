import CartDaoMongoDB from '../daos/mongodb/cart.dao.js';
// import CartDaoFS from '../daos/filesystem/cart.dao.js';
// import { __dirname } from '../utils.js';
// const cartDao = new CartDaoFS(`${__dirname}/daos/filesystem/carts.json`);
const cartDao = new CartDaoMongoDB();

export const getAll = async () => {
  try {
    return await cartDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (id) => {
  try {
    return await cartDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await cartDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, obj) => {
  try {
    return await cartDao.update(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await cartDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const addProductToCart = async (idCart, idProd) => {
    try {
      const cart = await cartDao.getById(idCart);
      if (!cart) {
        throw new Error('Cart not found');
      }
  
      const productIndex = cart.products.findIndex(p => p.productId.toString() === idProd);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId: idProd, quantity: 1 });
      }
  
      const updatedCart = await cartDao.update(idCart, cart);
      return updatedCart;
    } catch (error) {
      throw new Error(error.message);
      console.error(`Error in addProductToCart service: ${error.message}`);
    }
  };