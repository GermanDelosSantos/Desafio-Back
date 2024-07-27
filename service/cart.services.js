// import CartDaoFS from '../daos/filesystem/cart.dao.js';
// import { __dirname } from '../utils.js';
// const cartDao = new CartDaoFS(`${__dirname}/daos/filesystem/carts.json`);
// const cartDao = new CartDaoMongoDB();
// const prodDao = new ProductDaoMongoDB();


import Services from './class.services.js';
import factory from '../persistence/daos/mongodb/factory.js';
const { prodDao, cartDao } = factory;

export default class CartServices extends Services {
  constructor() {
    super(cartDao);
  }
addProdToCart = async (cartId, prodId) => {
    try {
     const existCart = await getById(cartId);
     const existProd = await prodDao.getById(prodId);
     if(!existCart || !existProd) return null;
     //verificar si el prod existe en el cart
     const existProdInCart = await cartDao.existProdInCart(cartId, prodId);
     if(existProdInCart){
      const quantity = existProdInCart.products.find(p => p.product.toString() === prodId).quantity + 1;
      return await cartDao.addProdToCart(cartId, prodId, quantity);
     }
     return await cartDao.addProdToCart(cartId, prodId);
    } catch (error) {
      console.log(error);
    }
    };
    
removeProdToCart = async (cartId, prodId) => {
      try {
        const existCart = await getById(cartId);
        const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
        if(!existCart || !existProd) return null;
        return await cartDao.removeProdToCart(cartId, prodId);
      
      } catch (error) {
        console.log(error);
      }
    };
    
updateProdQuantityToCart = async (cartId, prodId, quantity) => {
      try {
        const existCart = await getById(cartId);
        const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
        if(!existCart || !existProd) return null;
        return await cartDao.updateProdQuantityToCart(cartId, prodId, quantity)
      } catch (error) {
        console.log(error);
      }
    };
    
clearCart = async (cartId) => {
      try {
        const existCart = await getById(cartId);
        if(!existCart) return null;
        return cartDao.clearCart(cartId);
      } catch (error) {
        console.log(error);
      }
    };

}

//  getAll = async () => {
//   try {
//     return await cartDao.getAll();
//   } catch (error) {
//     console.log(error);
//   }
// };

// getById = async (id) => {
//   try {
//     const cart = await cartDao.getById(id);
//     if (!cart) return false;
//     else return cart;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const create = async () => {
//   try {
//     const newcart = await cartDao.create();
//     if (!newcart) return false;
//     else return newcart;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const update = async (id, obj) => {
//   try {
//     const cartUpd = await cartDao.update(id, obj);
//     if (!cartUpd) return false;
//     else return cartUpd;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const remove = async (id) => {
//   try {
//     const cartDel = await cartDao.delete(id);
//     if (!cartDel) return false;
//     else return cartDel;
//   } catch (error) {
//     console.log(error);
//   }
// };


