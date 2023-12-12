import mongoose from "mongoose";
import schema from "./schema.js";
const animeModel = mongoose.model("anime", schema);
export default animeModel;