import mongoose from "mongoose";
import schema from "./schema.js";
const characterModel = mongoose.model("characters", schema);
export default characterModel;