import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/video-stream";

const connect = async () => {
  try {
    logger.info("Connecting to the Database...");
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Sucessfully connected to the Database ✅");
  } catch (error: any) {
    logger.error(error);
    process.exit(1);
  }
};