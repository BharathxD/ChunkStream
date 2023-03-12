import jwt from "jsonwebtoken";
import logger from "../../utils/logger";
import { User } from "../user/user.model";

export const signJWT = (
  payload: string | Buffer | object,
  options?: jwt.SignOptions
) => {
  const JWT_SECRET = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  const EXPIRES_IN = process.env.EXPIRES_IN || "7d";
  const signingKey = Buffer.from(JWT_SECRET!, "base64").toString("ascii");
  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: "RS256",
    expiresIn: EXPIRES_IN,
  });
};

export const verifyJWT = (token: string) => {
  const JWT_SECRET = process.env.ACCESS_TOKEN_PUBLIC_KEY;
  const verifyingKey = Buffer.from(JWT_SECRET!, "base64").toString("ascii");
  try {
    const decoded = jwt.verify(token, verifyingKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    logger.error(error);
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
