import User from "../models/User";

export default {
  users: () => {
    return User.find({});
  }
};
