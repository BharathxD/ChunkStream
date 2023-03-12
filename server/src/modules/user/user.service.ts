import { User, UserModel } from "./user.model";
import { omit } from "lodash";

export const createUser = async (user: Omit<User, "comparePassword">) => {
  const createdUser = await UserModel.create(user);
  return omit(createdUser.toJSON(), "password");
};

export const findUserByEmail = async (email: User["email"]) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const validateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return null;
  }
  return omit(user.toJSON(), "password");
};
