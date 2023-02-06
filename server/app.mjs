import express from "express";
import cors from "cors";
import path from "path";
import { MailRouter } from "./routes/mailer.mjs";

const app = express();
app.use(express.static("server/public"));
app.use(express.json());
app.use(cors());

app.use("/api/bookings", MailRouter);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

export { app };
