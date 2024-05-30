import mongoose from "mongoose";

export const cartsCollectionName = "cart";

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

export const CartModel = mongoose.model(cartsCollectionName, cartSchema);