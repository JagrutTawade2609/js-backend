import { Router } from "express";

import { Register } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.post('/register',Register);

export default AuthRouter;