import { Request, Response } from "express";
import { findUserByEmail } from "../user/user.service";
import { User } from "../user/user.model";
import { StatusCodes } from "http-status-codes";
import { signJWT } from "./auth.utils";

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // TODO: Find user by email
  const user = findUserByEmail(email);
  // TODO: Verify user password
  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Invalid email or password " });
  }
  const payload = user.toJSON();
  // TODO: Sign a JWT
  const jwt = signJWT(payload);
  // TODO: Add a cookie to response
  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, //? 1 Year
    httpOnly: true,
    domain: "localhost", //? Dev Environment
    path: "/",
    sameSite: "strict",
    secure: false, //? Dev Environment
  });
  // TODO: RESPOND
  return res.status(StatusCodes.OK).send(jwt);
};
