import { Router } from "express";
import UserRouter from "./user.route.js";

const MainRouter = Router();

MainRouter.use('/user',UserRouter)

export default MainRouter