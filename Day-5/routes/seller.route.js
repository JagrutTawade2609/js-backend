import router from "express";
import { addProduct, updateProduct } from "../controllers/seller.controller.js";
import { getProducts } from "../controllers/seller.controller.js";
const SellerRouter = router();

SellerRouter.post('/add-product', addProduct);
SellerRouter.get('/products', getProducts);
SellerRouter.put('/update-product', updateProduct);
export default SellerRouter