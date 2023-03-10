import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "./utils/logger";
import { connect, disconnect } from "./utils/connect";
import { CORS_ORIGIN } from "./constants/constants";
import helmet from "helmet";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());

const server = app.listen(PORT, async () => {
  await connect();
  logger.info(`Server is running on http://localhost:${PORT}`);
});

//? These are signals used to terminate a process
const signals = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal: string) => {
  process.on(signal, async () => {
    server.close();
    await disconnect();
    //? Disconnect from the Database
    console.log("Exit: My Work Here Is Done ✅");
    process.exit(0);
  });
};

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
