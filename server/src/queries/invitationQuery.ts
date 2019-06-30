import mongoose from "mongoose";

import Invitation from "../models/Invitation";
import Category from "../models/Category";
import getUser from "../utils/getUser";

export default {
  invitations: async (_: any, args: any, context: any) => {
    let query = {};
    const user: any = await getUser(context);
    if (user) {
      query = { user: user._id };
    }
    return Invitation.find(query)
      .populate("user")
      .populate("address");
  },
  invitationDetail: async (_: any, args: any, context: any) => {
    return Invitation.findById(args._id)
      .populate("user")
      .populate("address");
  }
};
