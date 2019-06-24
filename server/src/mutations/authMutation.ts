import jwt from "jsonwebtoken";

import User from "../models/User";

declare var process: {
  env: {
    SECRET: string;
  };
};

export default {
  signin: async (root: any, args: any) => {
    const secret = process.env.SECRET;
    const { userName, password } = args;
    const user: any = await User.findOne({ userName });
    if (!user) {
      throw new Error("User not found !");
    }
    const hashPassword: any = jwt.verify(user.password, secret);
    if (hashPassword.password !== password) {
      throw new Error("Wrong password");
    }
    const token = jwt.sign({ userId: user._id }, secret, {
      algorithm: "HS256"
    });
    return { token };
  }
};
