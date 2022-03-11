const mongoose = require("mongoose");

const connection = () => {
  return mongoose
    .connect(process.env.CONNECTION_STRING_DEPLOY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => console.log("db connected"))
    .catch((err) => console.log(err));
};

module.exports = connection;
