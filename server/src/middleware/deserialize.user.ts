import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../modules/auth/auth.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ""
  ).replace(/^Bearer\s/, "");
  if (!accessToken) {
    return next();
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
