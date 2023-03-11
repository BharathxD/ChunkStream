import { Request, Response } from "express";

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // TODO: Find user by email
  // TODO: Verify user password
  // TODO: Sign a JWT
  // TODO: Add a cookie to response
  // TODO: RESPOND
};
