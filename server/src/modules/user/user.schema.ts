import { object, string, TypeOf } from "zod";

export const RegisterUserSchema = {
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    email: string({
      required_error: "Email is required",
    }).includes("@"),
    password: string({
      required_error: "Password is Required",
    })
      .min(6, "The length of the password should be atleast 6 Characters long")
      .max(
        64,
        "Password is too long, it should not be longer than 64 Characters"
      ),
    confirmPassword: string({
      required_error: "Password confirmation is Required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};

export type registerUserInput = TypeOf<typeof RegisterUserSchema.body>;
