import mongoose from "mongoose";
import logger from "./logger";

export const connectToDatabase = async () => {
  const DB_CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING ||
    "mongodb://localhost:27017/video-stream";
  mongoose.set("strictQuery", false);
  try {
    logger.info("Connecting to the Database...");
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Sucessfully connected to the Database ✅");
  } catch (error: any) {
    logger.info("Error connecting to the Database ❌");
    logger.error(error.message);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.connection.close();
  } catch (error: any) {
    logger.error(error);
  } finally {
    return;
  }
};
