const express = require("express");
const connection = require("./configration/configDb");
require("dotenv").config();
const app = express();
const cors = require("cors");
const userRoute = require("./modules/users/routes/users.route");
const blogRoute = require("./modules/blogs/routes/blogRoutes");
const commentRoutes = require("./modules/Comments/routes/commentRoutes");
const dailyEmail = require("./common/jobs/jobs");
const { createInvoice } = require("./common/Service/createPdf");
const jobs = require("./common/jobs");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
connection();
app.use("/uploads", express.static("uploads"));
app.use(userRoute);
app.use(blogRoute);
app.use(commentRoutes);

jobs();

app.get("/", async (req, res) => {
  const invoice = {
    // shipping: {
    //   name: "ahmed",
    //   address: "1234 Main Street",
    //   city: "San Francisco",
    //   state: "CA",
    //   country: "US",
    //   postal_code: 94111,
    // },
    // items: [
    //   {
    //     item: "TC 100",
    //     description: "Toner Cartridge",
    //     quantity: 2,
    //     amount: 6000,
    //   },
    //   {
    //     item: "USB_EXT",
    //     description: "USB Cable Extender",
    //     quantity: 1,
    //     amount: 2000,
    //   },
    // ],
    // subtotal: 8000,
    // paid: 0,
    // invoice_nr: 1234,
  };

  createInvoice(invoice, "invoice.pdf");
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SENDER, // generated ethereal user
      pass: process.env.PASSWORD_SENDER, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: '"Node project 👻" <foo@example.com>', // sender address
    to: `ahmed.moustafa9663@gmail.com`,
    cc: "", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>
    <b>Hello world?</b>
    </div>`,
    attachments: [
      {
        filename: "test.pdf",
        path: "invoice.pdf",
        contentType: "application/pdf",
      },
    ], // html body
  });
  res.send("Hello World  update!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
