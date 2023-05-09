import { createTransport } from "nodemailer";
import { email, password, mailHost, mailPort } from "../constants/index.mjs";

const createRatingService = async (body) => {
  const transporter = createTransport({
    host: mailHost,
    port: mailPort,
    auth: {
      user: email,
      pass: password,
    },
  });
  const mail = {
    from: body.email,
    to: email,
    subject: `New Rating from ${body.name}`,
    text: `
      Name: ${body.name} \n
      Email: ${body.email} \n 
      Rating: ${body.ratingScore} \n 
      Review: ${body.review}
      `,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      return false;
    }
  });
  return true;
};

export { createRatingService };
