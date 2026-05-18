import UserModel from "../models/user.schema.js";

export const Register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message: "All fields are required"})
        }
        const user = new UserModel({name, email, password, role}); // Create a new user instance
        await user.save(); // Save the user to the database
        res.status(201).json({ 
            message: "user registered successfully", 
            user: { name, email, password, role} // Return the user details in the response (excluding sensitive information like password)
        
        })
    }catch(error){
        res.status(500).json({message: "Error registering user", error: error.message})
    }
};