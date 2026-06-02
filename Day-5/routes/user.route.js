import { Router } from "express";
import { Profile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { UpdateProfile } from "../controllers/user.controller.js";
import { deleteProfile } from "../controllers/user.controller.js"
import { Cart } from "../controllers/user.controller.js";
import { GetCartProducts } from "../controllers/user.controller.js";
import { CreateCheckoutSession } from "../controllers/user.controller.js";
import { UpdateCartQuantity } from "../controllers/user.controller.js";
import { GetOrders } from "../controllers/user.controller.js";
const UserRouter = Router();


UserRouter.post('/profile', Profile)
UserRouter.patch('/update-profile',  UpdateProfile)
UserRouter.delete('/delete-profile/:id', deleteProfile)
UserRouter.post('/add-to-cart', Cart)
UserRouter.get('/get-cart', GetCartProducts)
UserRouter.post('/create-checkout', CreateCheckoutSession)
UserRouter.put("/update-cart-quantity", UpdateCartQuantity)
UserRouter.get('/get-orders', GetOrders)
export default UserRouter