import mongoose from "mongoose";
const animeSchema = new mongoose.Schema({
    animeId: String,
    imageUrl: String
  },
  { collection: "anime" });
export default animeSchema;