import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    role: { type: String, default: "user", enum: ["user","seller","admin"]},
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;