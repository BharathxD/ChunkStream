import express from "express";
import {
  findVideosHandler,
  streamVideoHander,
  updateVideoHandler,
  uploadVideoHandler,
} from "./video.controller";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.post("/", requireUser, uploadVideoHandler);
router.patch("/:videoId", requireUser, updateVideoHandler);
router.get("/", findVideosHandler);
router.get("/:videoId", streamVideoHander);

export default router;
