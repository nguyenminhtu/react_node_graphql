import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, default: "Unknown" },
    address: { type: String, require: true },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }
    },
    user: { type: String, required: true, ref: "User", index: true }
  },
  { collection: "addresses", timestamps: true }
);

addressSchema.index({ location: "2dsphere" });

const Address = mongoose.model("Address", addressSchema);

export default Address;
