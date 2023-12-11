import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    category: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: String, required: true },
    vedette: { type: Boolean, default: false, required: true },
    new: { type: Boolean, default: false, required: true },
    promo: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
