import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export const categorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true }
  },
  { collection: "categories", timestamps: true }
);

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model("Category", categorySchema);

export default Category;
