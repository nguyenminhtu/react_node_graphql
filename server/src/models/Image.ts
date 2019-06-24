import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema(
  {
    path: { type: String, require: true }
  },
  { collection: "images", timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
