import UserModel from "../../src/server/models/UserModel";
import "dotenv/config";

import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI!)
  .then((mongoose) => {
    console.log("Mongo Connected");
    return mongoose;
  })
  .catch((err: any) => {
    console.log("Mongo failed");
    process.exit(1);
  });

const seedAdmin = async () => {
  const user = await UserModel.findOne({ role: "admin" });

  if (user) {
    console.log("Admin already exist");
    process.exit(1);
  }
  const userData = {
    name: "Major Web",
    first_name: "Major",
    last_name: "Web",
    email: `majorwebprojects@gmail.com`,
    password: "b@snp!@g",
    role: "admin",
    emailVerified: new Date(),
  };
  const nomayiniData = {
    name: "Nomayini",
    first_name: "Nomayini",
    last_name: "team",
    email: `nomayini.com@gmail.com`,
    password: "b@snp!@g",
    role: "admin",
    emailVerified: new Date(),
  };
  await UserModel.create(userData)
    .catch((err) => console.log(err.message))
    .then(() => {
      console.log("Finished");
    });
  await UserModel.create(nomayiniData)
    .catch((err) => console.log(err.message))
    .then(() => {
      console.log("Finished");
    });
};

seedAdmin().then(() => {
  mongoose.connection.close();
  process.exit(1);
});
