import env from "./config/env";

import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import csurf from "csurf";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import userRouter from "./routes/user.route";

const app: Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: [env.CLIENT_BASE_URL || ""],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
); // control domain access - update as required

app.use(helmet()); // setting necessary HTTP headers

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 60,
});

app.use(limiter); // limit each IP to 100 requests per windowMs

app.use(cookieParser()); // required for csurf

if (env.NODE_ENV != "development") {
  // Prevent Cross-Site Request Forgery
  const csrfProtection = csurf();
  app.use(csrfProtection);
}

app.get("/", (_req: Request, res: Response) => {
  res.send(`Welocme to ${env.PROJECT_NAME}`);
});

app.use("/api/users", userRouter); // mounting the user routes

export default app;
