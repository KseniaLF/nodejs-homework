const app = require("./app");

const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// const connection = mongoose.connect(DB_HOST, {
//   promiseLibrary: global.Promise,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// connection
//   .then(() => {
//     app.listen(3000, function () {
//       console.log(`Server running. Use our API on port: ${3000}`);
//     });
//   })
//   .catch((err) =>
//     console.log(`Server not running. Error message: ${err.message}`)
//   );

// async function main() {
//   await mongoose.connect(DB_HOST);

//   console.log("Database connection successful");

//   const contactSchema = new mongoose.Schema(
//     {
//       name: {
//         type: String,
//         required: [true, "Set name for contact"],
//       },
//       email: {
//         type: String,
//       },
//       phone: {
//         type: String,
//       },
//       favorite: {
//         type: Boolean,
//         default: false,
//       },
//     },
//     {
//       versionKey: false,
//       timestamps: true,
//     }
//   );

//   const Book = mongoose.model("Contact", contactSchema);
//   // const res = await Book.create({ name: "asfasbfbffaf", email: "fefef" });
//   // console.log(res);

//   const res = await Book.find();
//   console.log(res);
// }
// main().catch((error) => {
//   console.log(error.message);
//   process.exit(1);
// });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// 7u1uUHpHwuLH9m2Z
