import Category from "../models/Category";

export default {
  categories: async (_: any, args: any, context: any) => {
    return Category.find({}).populate("user");
  },
};
