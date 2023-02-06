import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const mailHost = process.env.MAILHOST;
const mailPort = Number(process.env.MAILPORT);

export { PORT, email, password, mailHost, mailPort };
