const User = require("../Model/user.model");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SENDER, // generated ethereal user
    pass: process.env.PASSWORD_SENDER, // generated ethereal password
  },
});

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json({ message: "All users", data: users });
};

const sign_up = async (req, res) => {
  let { name, email, age, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "email is already exist" });
    } else {
      const customer = new User({ name, email, age, password, role });
      await customer.save();
      const token = jwt.sign({ email }, "shhhhh");

      let info = await transporter.sendMail({
        from: '"Node project 👻" <foo@example.com>', // sender address
        to: `${email}, `,
        cc:'', // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<div>
        <b>Hello world?</b>
          <a href="http://localhost:5000/verifyUser/${token}"> verify </a>
        </div>`, // html body
      });
      res.status(StatusCodes.CREATED).json({ message: "user created" });
    }
  } catch (errors) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", ...errors });
  }

  // try {
  //   await User.insertMany({ name, email, age, password });
  //   res.json({ message: "registed success" });
  // } catch ({ errors }) {
  //   res.json({ message: "error", ...errors });
  // }
};

const verifyUser = async (req, res) => {
  const decoded = jwt.verify(req.params.token, "shhhhh");
  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "invalid email" });
  } else {
    const updated = await User.updateOne(
      { email: decoded.email },
      { verified: true }
    );
    res.json({ message: "verfied success" });
  }
};

const sign_in = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "email is not found" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ _id: user._id, role: user.role }, "shhhhh");
        // var decoded = jwt.verify(token, 'shhhhh');

        res.status(StatusCodes.OK).json({
          message: "success",
          token,
          data: {
            _id: user._id,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "incorrect password" });
      }
    }
  } catch (error) {
    res.json({ message: "error", error });
  }
};
const getUser = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.json({ message: "success", user });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.deleteOne({ _id: id });
    res.json({ message: "deleted success", user });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  try {
    const user = await User.updateOne({ _id: id }, { name: name });
    res.json({ message: "updated success", user });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

module.exports = {
  getAllUsers,
  sign_up,
  getUser,
  deleteUser,
  updateUser,
  sign_in,
  verifyUser,
};
