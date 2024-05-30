import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  async getAll() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const response = await CartModel.findById(id);
      return response;
    } catch (error) {
      console.log('Error al buscar el carrito')
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, { new: true });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
