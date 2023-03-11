import mongoose, { FilterQuery } from "mongoose";
import { User, UserModel } from "./user.model";
import { omit } from "lodash";

export const createUser = async (user: Omit<User, "comparePassword">) => {
  const createdUser = await UserModel.create(user);
  return omit(createdUser.toJSON(), "password");
};

export const findUserByEmail = (email: User["email"]) => {
  const user = UserModel.findOne({ email });
  console.log(user);
  return user;
};
