import express from "express";
import { loginHandler, logoutHandler } from "./auth.controller";
import { processRequestBody } from "zod-express-middleware";
import { LoginSchema } from "./auth.schema";

const router = express.Router();

router.post("/", processRequestBody(LoginSchema.body), loginHandler);
router.post("/", logoutHandler);

export default router;
