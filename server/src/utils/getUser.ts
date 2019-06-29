import jwt from "jsonwebtoken";
import User from "../models/User";

declare var process: {
  env: {
    SECRET: string;
  };
};

const getUser: any = async (context: any) => {
  const token: string = context.context.req.headers.authorization || "";
  if (token === "") {
    return null;
  }
  const hash: any = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(hash.userId);
  if (!user) {
    return null;
  }
  return user;
};

export default getUser;
