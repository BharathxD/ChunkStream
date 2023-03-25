import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../modules/auth/auth.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken =
    req.headers.authorization?.replace(/^Bearer\s/, "") ||
    req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: "Access token missing" });
  }
  try {
    const decoded = verifyJWT(accessToken);
    res.locals.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid access token" });
  }
};

export default deserializeUser;
