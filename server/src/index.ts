import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "./utils/logger";
import { connectToDatabase, disconnectFromDatabase } from "./utils/connect";
import { CORS_ORIGIN } from "./constants/constants";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import videoRoute from "./modules/videos/video.route";
import deserializeUser from "./middleware/deserialize.user";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);

const server = app.listen(PORT, async () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

//? These are signals used to terminate a process
const signals = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal: string) => {
  process.once(signal, async () => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    try {
      await Promise.all([
        new Promise<void>((resolve, reject) => {
          server.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }),
        disconnectFromDatabase(),
      ]);
      console.log("Server and database connections closed ✅.");
      process.exit(0);
    } catch (err) {
      console.error("Error while shutting down ❌:", err);
      process.exit(1);
    }
  });
};

for (const signal of signals) {
  gracefulShutdown(signal);
}
