const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    age: { type: Number, min: [6, "err min"] },
    role: { type: String },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

// // userSchema.pre("find", function () {
// //   console.log("pre ************ , ", new Date());
// // });

// userSchema.post("find", function () {
//   console.log("post ************", new Date());
// });

module.exports = userSchema;
