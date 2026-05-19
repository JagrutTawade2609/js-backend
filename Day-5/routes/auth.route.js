import { Router } from "express";

import { Register, Login, UpdateUserPassword } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.post('/register',Register);
AuthRouter.post('/login', Login);
AuthRouter.put('/update-user-password', UpdateUserPassword);

export default AuthRouter;