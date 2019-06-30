import Invitation from "../models/Invitation";
import Address from "../models/Address";
import Category from "../models/Category";
import getUser from "../utils/getUser";
import { processUpload } from "../utils/fileUtils";

export default {
  createInvitation: async (_: any, args: any, context: any) => {
    const user: any = await getUser(context);
    if (!user) {
      throw new Error("Unauthorize request");
    }
    const lat = parseFloat(args.lat);
    const lng = parseFloat(args.lng);
    const locations = {
      type: "Point",
      coordinates: [lng, lat]
    };
    const images = args.files
      ? await Promise.all(args.files.map(processUpload))
      : [];
    const address = await Address.create({
      address: args.address,
      locations,
      user: user._id
    });
    let promises: any = [];
    args.categories.map((category: any) => {
      return promises.push(Category.findById(category));
    });
    const categories = await Promise.all(promises);
    const invitation = await Invitation.create({
      title: args.title,
      description: args.description,
      user: user._id,
      images,
      address: address._id,
      categories
    });
    return invitation;
  },
  updateInvitation: async (_: any, args: any, context: any) => {
    const user: any = await getUser(context);
    if (!user) {
      throw new Error("Unauthorize request");
    }
  }
};
