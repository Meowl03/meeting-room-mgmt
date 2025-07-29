const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    userType: { type: String, default: "client", enum: ["client", "admin"] },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
