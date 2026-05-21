import UserModel from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message: "All fields are required"})
        }
        const existingUser = await UserModel.findOne({ email: email }); // Check if a user with the same email already exists in the database
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" }); // If a user with the same email exists, return a 400 Bad Request response with an error message
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt
        const user = new UserModel({
            name: name, 
            email: email, 
            password: hashedPassword, 
            role: role}); // Create a new user instance
        await user.save(); // Save the user to the database
        res.status(201).json({ 
            message: "user registered successfully", 
            success: true,
            user: { name: name, email: email, password: hashedPassword, role: role } // Return the user details in the response (excluding sensitive information like password)
        
        })
    }catch(error){
        return res.status(500).json({message: "Error registering user", error: error.message, success: false})
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from the request body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false }); // If email or password is missing, return a 400 Bad Request response with an error message
        }
        const user = await UserModel.findOne({ email: email} ); // Find the user in the database by email
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false }); // If the user is not found, return a 404 Not Found response with an error message
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password stored in the database using bcrypt
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password", success: false }); // If the password is invalid, return a 401 Unauthorized response with an error message
        }
        const token = jwt.sign({ 
            userId: user._id, 
            role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        ); // Generate a JSON Web Token (JWT) with the user's ID and role
        res.cookie("token", token, { httpOnly: true }); // Set the token as an HTTP-only cookie in the response
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role
        }; // Prepare the user data to be sent in the response (excluding sensitive information like password)  
        return res.status(200).json({ success: true, token, message: "Login successful", user: userData }); // If login is successful, return a 200 OK response with a success message and user details (excluding sensitive information like password)
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error: error.message, success: false }); // If an error occurs during the login process, return a 500 Internal Server Error response with an error message
    }
};

export const GetCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token; // Retrieve the token from the request cookies
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false }); // If no token is found, return a 401 Unauthorized response with an error message
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId).select("-password"); // Find the user in the database by ID and exclude the password field
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false }); // If the user is not found, return a 404 Not Found response with an error message
        }
        return res.status(200).json({ success: true, user }); // If the user is found, return a 200 OK response with the user details (excluding sensitive information like password)
    }
    catch (error) {
        return res.status(500).json({ message: "Error retrieving user", error: error.message, success: false }); // If an error occurs during the process, return a 500 Internal Server Error response with an error message
    }
};

export const UpdateUserPassword = async (req, res) => {
    try {
        const users = await UserModel.find(); // Retrieve all users from the database
        for (let i = 0; i < users.length; i++) {
            if (!users[i].password.startsWith("$2b$")) { // Check if the password is not already hashed (bcrypt hashes start with "$2b$")
                const hashedPassword = await bcrypt.hash(users[i].password, 10); // Hash the password using bcrypt
                await UserModel.findByIdAndUpdate(users[i]._id, { password: hashedPassword }); // Update the user's password in the database with the hashed version
            }
        }
        return res.status(200).json({ message: "Passwords updated successfully", success: true }); // Return a success message in the response    
    } catch (error) {
        return res.status(500).json({ message: "Error updating password", error: error.message, success: false }); // If an error occurs, return a 500 Internal Server Error response with an error message
    }
};