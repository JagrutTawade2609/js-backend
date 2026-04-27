import { Router } from "express";
import { profile } from "../controllers/user.controller.js";

const UserRouter = Router();


UserRouter.post('/profile', profile)

export default UserRouter