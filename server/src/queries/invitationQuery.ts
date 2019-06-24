import Invitation from "../models/Invitation";
import getUser from "../utils/getUser";

export default {
  invitations: async (_: any, args: any, context: any) => {
    const token: string = context.context.req.headers.authorization;
    const user: any = await getUser(token);
    if (!user) {
      throw new Error("Unauthorize request");
    }
    return Invitation.find({ user: user._id })
      .populate("user")
      .populate("address");
  }
};
