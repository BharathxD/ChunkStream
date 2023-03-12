import express from "express";
import { updateVideoHandler, uploadVideoHandler } from "./video.controller";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.post("/", requireUser, uploadVideoHandler);
router.patch("/:videoId", requireUser, updateVideoHandler);

export default router;
