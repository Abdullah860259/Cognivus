import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String }, // will be null for Google users
  name: { type: String },
  image: { type: String },
  contact: { type: Number },
  city: { type: String },
  issueRaised: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
  mcqData: { type: mongoose.Schema.Types.ObjectId, ref: "McqsData" },
  college: { type: String },
  provider: { type: String, default: "credentials" },
  isverified: { type: Boolean, default: false },
  token: { type: String },
  age: { type: Number },
  class: { type: String },
  board: { type: String },
  group: {
    type: String,
    enum: ["Medical", "Engineering", "Others"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
