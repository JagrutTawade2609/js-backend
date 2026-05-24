import { Router } from "express";

import { Register, Login, logout, GetCurrentUser, UpdateUserPassword } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.post('/register',Register);
AuthRouter.post('/login', Login);
AuthRouter.put('/update-user-password', UpdateUserPassword);
AuthRouter.get('/get-current-user', GetCurrentUser);
AuthRouter.get('/logout', logout);
export default AuthRouter;