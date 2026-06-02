import mongoose, {Schema} from "mongoose";

const OrderSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true},
        quantity: {type: Number, required: true}
    }],

    totalAmount: {type: Number, required: true},

    appliedCoupon: {type: String, default: ""},

    discount: {type: Number, default: 0},

    orderDate: {type: Date, default: Date.now}
});

const OrderModel = mongoose.model("Orders", OrderSchema);

export default OrderModel;