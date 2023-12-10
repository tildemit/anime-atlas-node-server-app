import mongoose from "mongoose";
import schema from "./schema.js";
const reviewModel = mongoose.model("reviews", schema);
export default reviewModel;