import Address from "../models/Address";

export default {
  addresses: async (_: any, args: any, context: any) => {
    return Address.find({}).populate("user");
  }
};
