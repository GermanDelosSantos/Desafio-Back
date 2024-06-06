import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const productsCollectionName = "products";

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

productsSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model(
  productsCollectionName,
  productsSchema
);