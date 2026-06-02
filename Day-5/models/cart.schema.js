import mongoose, {Schema} from "mongoose";

const CartSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true},
        quantity: {type: Number, required: true}
    }]
});

const CartModel = mongoose.model("Carts", CartSchema);
export default CartModel;   