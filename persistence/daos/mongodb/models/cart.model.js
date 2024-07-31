import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export const cartsCollectionName = "carts";

export const cartSchema = new Schema({
  products: [
    {
      _id: false,
      quantity: {
        type: Number,
        default: 1 
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "products" // Referencia al modelo de productos
      },
      users: {
        type: Schema.Types.ObjectId,
        ref: "users", // Referencia al modelo de usuarios
      
      }
    }
  ]
});

export const CartModel = mongoose.model(cartsCollectionName, cartSchema);