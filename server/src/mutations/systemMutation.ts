import jwt from "jsonwebtoken";

import User from "../models/User";
import Address from "../models/Address";
import Invitation from "../models/Invitation";
import Category from "../models/Category";
import Image from "../models/Image";

declare var process: {
  env: {
    SECRET: string;
  };
};

export default {
  init: async () => {
    const categories = ["Kid's fashion", "Men's fashion", "Girl's fashion"];
    for (let i = 0; i < categories.length; i++) {
      await Category.create({ name: categories[i] });
    }

    const categoryList = await Category.find({});

    for (let i = 0; i < 20; i++) {
      let user = await User.create({
        displayName: `User 0${i + 1}`,
        userName: `user0${i + 1}`,
        password: jwt.sign({ password: "password" }, process.env.SECRET),
        categories: categoryList
      });

      let address = await Address.create({
        title: `Address 0${i + 1}`,
        address: `Place 0${i + 1}`,
        location: {
          type: "Point",
          coordinates: [123.123, 12.45]
        },
        user: user._id
      });

      await Invitation.create({
        title: `Invitation 0${i + 1}`,
        description: `Description 0${i + 1}`,
        user: user._id,
        categories: categoryList,
        address: address._id
      });
    }
    return "Ok";
  },
  reset: async () => {
    await User.remove({});
    await Address.remove({});
    await Category.remove({});
    await Invitation.remove({});
    await Image.remove({});
    return "Ok";
  }
};
