import { VideoModel } from "./video.model";
import { Video } from "./video.model";

export const createVideo = async ({ owner }: { owner: string }) => {
  return await VideoModel.create({ owner });
};

export const findVideo = async ({ videoId }: { videoId: Video["videoId"] }) => {
  const video = await VideoModel.findOne({ videoId });
  return video;
};

export const findVideos = async () => {
  //? Plain JavaScript Objects
  const video = await VideoModel.find({ published: true }).lean();
  return video;
};
