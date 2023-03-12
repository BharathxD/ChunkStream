import { VideoModel } from "./video.model";
import { Video } from "./video.model";

export const createVideo = async ({ owner }: { owner: string }) => {
  return await VideoModel.create({ owner });
};

export const findVideo = async ({ videoId }: { videoId: Video["videoId"] }) => {
  return await VideoModel.findById({ videoId });
};
