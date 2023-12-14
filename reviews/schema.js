import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    animeId: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewText: String
}, {
    collection: "reviews"
});
export default reviewSchema;