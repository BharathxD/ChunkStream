import mongoose from "mongoose";
import { User, UserModel } from "./user.model";

export const createUser = async (user: Omit<User, "comparePassword">) => {
  return await UserModel.create(user);
};
