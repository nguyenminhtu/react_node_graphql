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
    const categories = ["Lorem", "Ipsum", "is", "simply", "dummy", "text", "of", "the", "printing", "and", "typesetting", "industry.", "Lorem", "Ipsum", "has", "been", "the", "industry's", "standard", "dummy", "text", "ever", "since", "the", "1500s,", "when", "an", "unknown", "printer", "took", "a", "galley", "of", "type", "and", "scrambled", "it", "to", "make", "a", "type", "specimen", "book"]
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

      for (let invitationItem = 0; invitationItem < 10; invitationItem++) {
        await Invitation.create({
          title: `Invitation user 0${i + 1} item ${invitationItem + 1}`,
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
          user: user._id,
          categories: categoryList,
          address: address._id
        });
      }
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
