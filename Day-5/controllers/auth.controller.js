import UserModel from "../models/user.schema.js";

export const Register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message: "All fields are required"})
        }
        const user = new UserModel({name, email, password, role});
        await user.save();
        res.status(201).json({
            message: "user registered successfully", 
            user: { name, email, password, role}
        
        })
    }catch(error){
        res.status(500).json({message: "Error registering user", error: error.message})
    }
};