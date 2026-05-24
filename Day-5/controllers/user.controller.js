import UserModel from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Profile = (req, res) => {
  try {
    const userId = req.userId;
    const userData = req.userData;
    console.log(userId, "userId");
    console.log(userData, "userData");
    userData.password = req.userPassword;
    return res.status(200).json({ success: true, profileData: userData });
    res.send(true);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    console.log(req.userId, "UPDATE USER ID");
    console.log(req.body);
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const { name, email, password } = req.body;

    const userData = {};

    if (name) userData.name = name;
    if (email) userData.email = email;
    if (password) userData.password = await bcrypt.hash(password, 10);

    // console.log(userData, "userData");

    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    const userNewData = {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      profileData: updatedUser,
      success: true,
      userData: userNewData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};



export const deleteProfile = async (req,res) => {
    try {
        const { id } = req.params
        await UserModel.findByIdAndDelete(id)
        res.json({ message: `User profile with id ${id} deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the profile', error: error.message })
    }
}