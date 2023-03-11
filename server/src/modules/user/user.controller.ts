import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser } from "./user.service";
import { registerUserInput } from "./user.schema";

export const registerUserHandler = async (
  request: Request<{}, {}, registerUserInput["body"]>,
  response: Response
) => {
  const { username, email, password } = request.body;
  try {
    // TODO: Create User
    const user = await createUser({ username, email, password });
    response.status(StatusCodes.CREATED).send("User created successfully");
  } catch (error: any) {
    if (error.code === 11000) {
      return response
        .status(StatusCodes.CONFLICT)
        .send({ message: "User already exists" });
    } else {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
};
