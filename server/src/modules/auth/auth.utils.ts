import jwt from "jsonwebtoken";
import logger from "../../utils/logger";

export const signJWT = (
  payload: string | Buffer | object,
  keyName: "accessTokenPrivateKey",
  options?: jwt.SignOptions
) => {
  const PrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  const expiresIn = process.env.EXPIRES_IN || "7d";
  const signingKey = Buffer.from(PrivateKey!, "base64").toString("ascii");
  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJWT = (token: string, keyName: "accessTokenPublicKey") => {
  const PubicKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  const verifyingKey = Buffer.from(PubicKey!, "base64").toString("ascii");
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
