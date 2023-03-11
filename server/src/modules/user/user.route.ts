import express from "express";
import { registerUserHandler } from "./user.controller";

const router = express.Router();

router.post("/user", registerUserHandler);

export default router;
