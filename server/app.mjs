import express from "express";
import cors from "cors";
import path from "path";
import { MailRouter } from "./routes/mailer.mjs";

const app = express();
app.use(express.static("server/public"));
app.use(express.json());
app.use(cors());

app.use("/api/bookings", MailRouter)
app.use("/api", (req, res) => {
    res.json({message: "Hello from the server!"});
});

const __dirname = path.resolve();
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "server/public/index.html"));
})
export {
    app
}