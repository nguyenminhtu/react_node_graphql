import mongoose from "mongoose";

import { imageSchema } from "./Image";

export const invitationSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    user: { type: String, required: true, ref: "User", index: true },
    images: [{ type: imageSchema }],
    address: { type: String, ref: "Address" }
  },
  { collection: "invitations", timestamps: true }
);

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;
