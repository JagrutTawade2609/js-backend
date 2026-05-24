import mongoose, { Schema } from "mongoose";
    
const ProductSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true, enum: ["Electronics", "Clothing", "Footwear"]},
    stock: {type: Number, required: true},
    seller: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
});

const ProductModel =  mongoose.model("Products", ProductSchema);
export default ProductModel;