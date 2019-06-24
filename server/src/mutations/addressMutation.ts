import Address from "../models/Address";
import getUser from "../utils/getUser";

export default {
  createAddress: async (_: any, args: any, context: any) => {
    const token: string = context.context.req.headers.authorization;
    const user: any = await getUser(token);
    if (!user) {
      throw new Error("Unauthorize request");
    }
    const lat = parseFloat(args.lat);
    const lng = parseFloat(args.lng);
    const locations = {
      type: "Point",
      coordinates: [lng, lat]
    };
    return Address.create({
      title: args.title,
      address: args.address,
      user: user._id,
      locations
    });
  }
};
