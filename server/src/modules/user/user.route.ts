import express from "express";
import { registerUserHandler } from "./user.controller";
import { processRequestBody } from "zod-express-middleware";
import { RegisterUserSchema } from "./user.schema";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.get("/", requireUser, (req, res) => {
  res.send(res.locals.user);
});

router.post(
  "/",
  processRequestBody(RegisterUserSchema.body),
  registerUserHandler
);

export default router;
