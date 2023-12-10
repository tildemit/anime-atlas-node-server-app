import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    animeId: String,
    reviewText: String
  },
  { collection: "reviews" });
export default reviewSchema;