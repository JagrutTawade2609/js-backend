import { Router } from "express";
import UserRouter from "./user.route.js";
import AuthRouter from "./auth.route.js";
import AdminRouter from "./admin.route.js";
import ProductRouter from "./product.route.js";
import SellerRouter from "./seller.route.js";
const MainRouter = Router();

MainRouter.use('/user', UserRouter)
MainRouter.use('/auth', AuthRouter)
MainRouter.use('/admin', AdminRouter)
MainRouter.use('/product', ProductRouter)
MainRouter.use('/seller', SellerRouter)
export default MainRouter