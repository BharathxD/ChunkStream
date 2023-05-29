import { Request, Response } from "express";
import { findUserByEmail, validateUser } from "../user/user.service";
import { StatusCodes } from "http-status-codes";
import { signJWT } from "./auth.utils";
import { loginInput } from "./auth.schema";

export const loginHandler = async (
  req: Request<{}, {}, loginInput>,
  res: Response
) => {
  try {

    const { email, password } = req.body;
    console.log(req.body);
    // TODO: Find user by email
    const user = await validateUser({ email, password });
    // TODO: Verify user password}
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Invalid email or password " });
    }
    // TODO: Sign a JWT
    const jwt = signJWT(user);
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
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ messages: "Something went wrong" });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", {
      domain: "localhost", // Change the domain if necessary
      path: "/",
      sameSite: "strict",
      secure: false, // Change to true in production (HTTPS)
    });
    return res.status(StatusCodes.OK).send({ message: "Logged out successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
  }
}
