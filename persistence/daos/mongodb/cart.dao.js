import { CartModel } from "./models/cart.model.js";
import MongoDao from './mongo.dao.js';


export default class CartDaoMongoDB extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async create() {
    try {
      return await this.model.create({
        products: [],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProdToCart(cartId, prodId, quantity) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) return null;
      //Buscar si existe el prod en el carrito
      const existProdIndex = cart.products.findIndex(
        (p) => p.product.toString() === prodId
      );

      if (existProdIndex !== -1) {
        //si el prod existe en el carrito
        cart.products[existProdIndex].quantity = quantity;
      } else cart.products.push({ product: prodId, quantity });

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async existProdInCart(cartId, prodId) {
    try {
      return await this.model.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProdToCart(cartId, prodId) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await this.model.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId, "products.product": prodId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearCart(cartId) {
    try {
      return await this.model.findByIdAndUpdate(
        cartId,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }
};

// export default class CartDaoMongoDB {
//   async getAll() {
//     try {
//       const response = await CartModel.find({});
//       return response;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async getById(id) {
//     try {
//       return await CartModel.findById(id).populate("products.product");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async create(obj) {
//     try {
//       const response = await CartModel.create(obj);
//       return response;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }


//   async delete(id) {
//     try {
//       const response = await CartModel.findByIdAndDelete(id);
//       return response;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
//   async addProdToCart(cartId, prodId, quantity) {
//     try {
//       const cart = await CartModel.findById(cartId);
//       if (!cart) return null;
//       const existProdIndex = cart.products.findIndex(p => p.product.toString() === prodId);

//       if(existProdIndex !== -1) {
//         cart.products[existProdIndex].quantity = quantity;
//       } else cart.products.push({ product: prodId, quantity });

//       await cart.save();

//       return cart;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async existProdInCart(cartId, prodId){
//     try {
//       return await CartModel.findOne({
//         _id: cartId,
//         products: { $elemMatch: { product: prodId } }
//       })
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async removeProdToCart(cartId, prodId) {
//     try {
//       return await CartModel.findOneAndUpdate(
//         { _id: cartId },
//         { $pull: { products: { product: prodId } } },
//         { new: true }
//       );
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async update(id, obj) {
//     try {
//       const response = await CartModel.findByIdAndUpdate(id, obj, {
//         new: true,
//       });
//       return response;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async updateProdQuantityToCart(cartId, prodId, quantity) {
//     try {
//      return await CartModel.findOneAndUpdate(
//       { _id: cartId, 'products.product': prodId },
//       { $set: { 'products.$.quantity': quantity } },
//       { new: true }
//      );
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async clearCart(cartId) {
//     try {
//      return await CartModel.findByIdAndUpdate(
//       cartId,
//       { $set: { products: [] } },
//       { new: true }
//      );
//     } catch (error) {
//       console.log(error);
//     }
//   }

// }
