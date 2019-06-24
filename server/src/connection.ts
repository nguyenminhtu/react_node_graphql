import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/calltoaction",
  {
    useNewUrlParser: true
  },
  (err: any) => {
    if (err) {
      console.log(`Got error when connect to mongodb: ${err.toString()}`);
    }
  }
);
