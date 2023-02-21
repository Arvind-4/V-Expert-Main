import express from "express";
import cors from "cors";
import { MailRouter } from "./routes/mailer.mjs";
import { BookingRouter } from "./routes/bookingRouter.mjs";
import { UserRouter } from "./routes/userRouter.mjs";
import { healthCheck } from "./utils/healthCheck.mjs";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/bookings", MailRouter);

app.use("/api/book", BookingRouter);
app.use("/api/user", UserRouter);

app.get("/api", healthCheck);

export { app };
