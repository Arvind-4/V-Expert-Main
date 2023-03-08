import { createTransport } from "nodemailer";
import { email, password, mailHost, mailPort } from "../constants/index.mjs";

const transporter = createTransport({
  host: mailHost,
  port: mailPort,
  auth: {
    user: email,
    pass: password,
  },
});

const mailSend = async (req, res) => {
  const body = req.body;
  const mail = {
    from: body.email,
    to: email,
    subject: `New Booking from ${body.name}`,
    text: `Name: ${body.name} \n Email: ${body.email} \n Phone: ${body.phoneNumber} \n Address: ${body.address} \n Date: ${body.pdate} \n Time: ${body.ptime} \n Requirements: ${body.requirements} \n Services: ${body.serviceList} \n Packages: ${body.packageList}`,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    } else {
      res.status(200).json({
        message: "Email sent!",
      });
    }
  });
};

export { mailSend };
