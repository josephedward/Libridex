const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/libridex");

const UserSeed = [
  {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@email.com",
    likes: ["The Wind in the Willows", "To Kill a Mockingbird"],
    password: "testPass"
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(UserSeed))
  .then(data => {
    console.log(
      data.result.n +
        " user records inserted into " +
        (process.env.MONGODB_URI || "mongodb://localhost/libridex")
    );
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
