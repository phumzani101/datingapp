// import { faker } from "@faker-js/faker";
import User from "../../src/server/models/UserModel";
import "dotenv/config";
import mongoose from "mongoose";
import { membersData } from "./memberData";

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

(async function () {
  try {
    await User.deleteMany();
    console.log("All Users Deleted");
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
})();

// const usersData = Array.from({ length: 20 }, (x, i) => i).map((id) => ({
//   name: faker.internet.userName(),
//   first_name: faker.person.firstName(),
//   last_name: faker.person.lastName(),
//   email: `majorars${id}@gmail.com`,
//   password: "majorars",
//   createdAt: faker.date.past(),
// }));

Promise.all(
  membersData.map(async (item) => {
    await User.create(item).catch((err) => console.log(err.message));
  })
)
  .then(() => {
    console.log("Finished");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    mongoose.connection.close();
    process.exit(1);
  });
