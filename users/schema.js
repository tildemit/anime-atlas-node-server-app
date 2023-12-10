import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    role: {
      type: String,
      enum: ["BASIC", "PREMIUM"],
      default: "BASIC" },
    likedAnime: {
      type: [String]},
      likedCharacters: {
        type: [String], 
        default: [] },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
          }],
          following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }],
          followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }]
  },
  { collection: "users" });
export default userSchema;