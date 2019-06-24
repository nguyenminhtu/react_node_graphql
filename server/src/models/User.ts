import mongoose from "mongoose";

import { categorySchema } from "./Category";
import { addressSchema } from "./Address";
import { invitationSchema } from "./Invitation";

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, require: true },
    userName: { type: String, require: true },
    password: { type: String, require: true },
    categories: [{ type: categorySchema }],
    addresses: [{ type: addressSchema }],
    invitations: [{ type: invitationSchema }]
  },
  { collection: "users", timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
