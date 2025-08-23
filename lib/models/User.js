import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String }, // will be null for Google users
  name: { type: String },
  image: { type: String },
  contact: { type: Number },
  provider: { type: String, default: "credentials" },
  isverified: { type: Boolean, default: false },
  token: { type: String },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
