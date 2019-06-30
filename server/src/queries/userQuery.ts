import getUser from "../utils/getUser";
import Invitation from "../models/Invitation";
import Address from "../models/Address";
import User from "../models/User";

export default {
  users: (_: any, args: any) => {
    return User.find({});
  },
  currentUserProfile: async (_: any, args: any, context: any) => {
    const user: any = await getUser(context);
    if (!user) {
      throw new Error("Unauthorize request");
    }
    const invitations = await Invitation.find({ user: user._id });
    const addresses = await Address.find({ user: user._id });
    user.invitations = invitations;
    user.addresses = addresses;
    return user;
  },
  userProfile: async (_: any, args: any, context: any) => {
    const user: any = await User.findById(args._id);
    if (!user) {
      throw new Error("Unauthorize request");
    }
    const invitations = await Invitation.find({ user: user._id });
    const addresses = await Address.find({ user: user._id });
    user.invitations = invitations;
    user.addresses = addresses;
    return user;
  }
};
