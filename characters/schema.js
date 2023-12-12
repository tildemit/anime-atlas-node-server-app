import mongoose from "mongoose";
const characterSchema = new mongoose.Schema({
    characterId: String,
    imageUrl: String
  },
  { collection: "characters" });
export default characterSchema;