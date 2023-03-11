import { TypeOf, object, string } from "zod";

export const LoginSchema = {
  body: object({
    email: string({
      required_error: "Email is Required",
    }).email("Must be a valid email"),
    password: string({
      required_error: "Password is Required",
    })
      .min(6, "The length of the password should be atleast 6 Characters long")
      .max(
        64,
        "Password is too long, it should not be longer than 64 Characters"
      ),
  }),
};

export type loginInput = TypeOf<typeof LoginSchema.body>;
