import express from "express";
import { findVideosHandler, updateVideoHandler, uploadVideoHandler } from "./video.controller";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.post("/", requireUser, uploadVideoHandler);
router.patch("/:videoId", requireUser, updateVideoHandler);
router.get("/", findVideosHandler);

export default router;
