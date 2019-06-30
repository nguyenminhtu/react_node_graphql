import Category from "../models/Category";

export default {
  createCategory: (_: any, args: any) => {
    return Category.create({ ...args });
  }
};
