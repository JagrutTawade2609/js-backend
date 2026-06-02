import router from "express";
import { addProduct, SellerDashboard, updateProduct } from "../controllers/seller.controller.js";
import { getProducts } from "../controllers/seller.controller.js";
const SellerRouter = router();

SellerRouter.post('/add-product', addProduct);
SellerRouter.get('/products', getProducts);
SellerRouter.put('/update-product', updateProduct);
SellerRouter.get("/dashboard", SellerDashboard);
export default SellerRouter