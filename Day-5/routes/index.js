import { Router } from "express";
import UserRouter from "./user.route.js";
import AuthRouter from "./auth.route.js";
import AdminRouter from "./admin.route.js";
const MainRouter = Router();

MainRouter.use('/user', UserRouter)
MainRouter.use('/auth', AuthRouter)
MainRouter.use('/admin', AdminRouter)
export default MainRouter