import jwt from "jsonwebtoken";
import getUser from "../utils/getUser";

import User from "../models/User";
import Category from "../models/Category";

declare var process: {
  env: {
    SECRET: string;
  };
};

export default {
  updateUser: async (root: any, args: any, context: any) => {
    const user = await getUser(context);
    if (!user) {
      throw new Error("Unauthorize request");
    }
    let password = user.password;
    if (args.password) {
      password = jwt.sign({ password: args.password }, process.env.SECRET);
    }
    let categories = user.categories;
    if (JSON.stringify(args.categories) !== JSON.stringify(categories)) {
      let promises: any = [];
      args.categories.map((category: any) => {
        return promises.push(Category.findById(category));
      });
      categories = await Promise.all(promises);
    }
    return User.updateOne(
      { _id: user._id },
      { $set: { ...args, password, categories } },
      { new: true }
    );
  },
  deleteUser: (root: any, args: any) => {
    return User.findOneAndDelete({ _id: args._id });
  }
};
