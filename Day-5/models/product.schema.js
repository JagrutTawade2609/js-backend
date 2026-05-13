import mongoose, { Schema } from "mongoose";

const ProductSchema = new schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    desc: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    stock: {type: Number, required: true},
});

const ProductModel =  mongoose.model(ProductSchema);
export default ProductModel;