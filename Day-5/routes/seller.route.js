import router from "express";
import { addProduct } from "../controllers/seller.controller.js";
import { getProducts } from "../controllers/seller.controller.js";
const SellerRouter = router();

SellerRouter.post('/add-product', addProduct);
SellerRouter.get('/products', getProducts);
export default SellerRouter