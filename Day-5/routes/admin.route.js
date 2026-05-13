import {Router} from 'express'
import { AllUsers,singleUser } from '../controllers/admin.controller.js';
const AdminRouter = Router()

AdminRouter.get('/',(req,res)=>{
    res.send("Admin Route")
});
AdminRouter.get('/all-users', AllUsers);
AdminRouter.get('/single-user/:id', singleUser)
export default AdminRouter