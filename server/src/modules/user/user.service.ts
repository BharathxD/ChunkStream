import { User } from "./user.model";

export const createUser = async (user: Omit<User, "comparePassword">) => {};
