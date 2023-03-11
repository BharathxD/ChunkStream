import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import argon2 from "argon2";

@pre<User>("save", async function (this, next) {
  // If the password is bening modified and the password is new, we will hash it
  if (!this.isModified("password") || this.isNew) {
    // We don't need to salt, as argon will handle it
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
})

// We are going to use this class for the model interface, and export a model
export class User {
  @prop({ required: true, unique: true })
  public username: string;
  @prop({ required: true, unique: true })
  public email: string;
  @prop({ required: true })
  public password: string;
  // Defining methods to compare password
  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
