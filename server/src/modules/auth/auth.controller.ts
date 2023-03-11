import { Request, Response } from "express";
import { findUserByEmail } from "../user/user.service";
import { User } from "../user/user.model";
import { StatusCodes } from "http-status-codes";

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // TODO: Find user by email
  const user = findUserByEmail(email);
  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Invalid email or password " });
  }
  const payload = user.toJSON();
  // TODO: Verify user password
  // TODO: Sign a JWT
  // TODO: Add a cookie to response
  // TODO: RESPOND
};
