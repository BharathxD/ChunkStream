import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/video-stream";

export const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    logger.info("Connecting to the Database...");
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Sucessfully connected to the Database ✅");
  } catch (error: any) {
    logger.error(error);
    process.exit(1);
  }
};

export const disconnect = async () => {
  try {
    logger.info("Terminating the Connection to the Database...");
    await mongoose.connection.close();
    logger.info("Sucessfully Disconnected from the Database ✅");
  } catch (error: any) {
    logger.error(error);
  } finally {
    return;
  }
};
