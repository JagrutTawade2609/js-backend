import UserModel from "../models/user.schema.js";

export const AllUsers = async (req, res) => {
    try {
        // Fetch all users
        const users = await UserModel.find();

        return res.status(200).json({
            message: "All users fetched successfully",
            users
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};

export const singleUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Logic to fetch a single user by ID from the database
        const user = await UserModel.findById(id); // Assuming you have a UserModel defined
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
}