import { model, Schema } from "mongoose";

const collection = "products";

const schema = new Schema(
  {
    name: { type: String, required: true },
    place: { type: String, enum: ["LATM", "Europe"], required: true },
    price: { type: Number, default: 10 },
    capacity: { type: Number, default: 50 },
    img: { type: String, default: "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" },
    date: { type: Date, default: new Date() }
  },
  { timestamps: true }
);

const Products = model(collection, schema);

export default Products;
