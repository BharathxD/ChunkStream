import express from "express";
import { loginHandler } from "./auth.controller";
import { processRequestBody } from "zod-express-middleware";
import { LoginSchema } from "./auth.schema";
const router = express.Router();

router.post("/", processRequestBody(LoginSchema.body), loginHandler);
