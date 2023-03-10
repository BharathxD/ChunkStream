import express from "express";
import logger from "../utils/logger";

const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

//? These are signals used to terminate a process
const signals = ["SIGTERM", "SIGINT"];

const gracefulShutdown = (signal: string) => {
  process.on(signal, () => {
    server.close();
    // TODO: Disconnect from the DataBase
    console.log("Exit: My Work Here Is Done ✅");
    process.exit(0);
  });
};

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
