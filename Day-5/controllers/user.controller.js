import UserModel from "../models/user.schema.js";
export const profile = (req,res) => {
    res.json( { Name: 'Jagrut', Desc: 'This is from controller'})
}

export const updateProfile = async (req,res) => { 
    try {
        const { id } = req.params
        const { name, email } = req.body
        // Logic to update the user profile in the database using the provided id, name, and email
        // For example, you can use a database query to update the user record based on the id
        // After updating, you can send a response back to the client indicating success or failure
        
        const updatedData = {};
        if (name) updatedData.name = name
        if (email) updatedData.email = email
        consle.log(updatedData);
        const user = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.json({ message: `User profile with id ${id} updated successfully`, updatedData: user })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message })
    }
}
export const deleteProfile = async (req,res) => {
    try {
        const { id } = req.params
        await UserModel.findByIdAndDelete(id)
        res.json({ message: `User profile with id ${id} deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the profile', error: error.message })
    }
}