import Address from "../models/Address";
import getUser from "../utils/getUser";

export default {
  addresses: async (_: any, args: any, context: any) => {
    const token: string = context.context.req.headers.authorization;
    const user: any = await getUser(token);
    if (!user) {
      throw new Error("Unauthorize request");
    }
    return Address.find({ user: user._id }).populate("user");
  }
};
