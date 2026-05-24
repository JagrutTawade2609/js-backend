import UserModel from "../models/user.schema.js";
import jwt from "jsonwebtoken";

export const verifyAndDecodeToken = async (req, res, next) => {
  try {
    const unrestrictedUrls = ["login", "register"];
    console.log(req.originalUrl.split("/")[4], "req.originalUrl");
    if (unrestrictedUrls.includes(req.originalUrl.split("/")[4])) {
      return next();
    }
    console.log(req.cookies, "ALL COOKIES");
    const token = req.cookies.token;
    console.log(token, "token");
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData, "decpededta");
    const user = await UserModel.findById(decodedData.userId);
    console.log(user, "FOUND USER");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.userPassword = user.password;
    user.password = "";
    req.userId = decodedData.userId;
    req.userData = user;
    return next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};