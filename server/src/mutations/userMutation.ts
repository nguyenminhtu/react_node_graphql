import jwt from "jsonwebtoken";

import User from "../models/User";

declare var process: {
  env: {
    SECRET: string;
  };
};

export default {
  createUser: (root: any, args: any) => {
    const password = jwt.sign({ password: args.password }, process.env.SECRET);
    return User.create({ ...args, password });
  },
  updateUser: (root: any, args: any) => {
    const { _id } = args;
    delete args._id;
    return User.findOneAndUpdate({ _id }, { $set: args }, { new: true });
  },
  deleteUser: (root: any, args: any) => {
    return User.findOneAndDelete({ _id: args._id });
  }
};
