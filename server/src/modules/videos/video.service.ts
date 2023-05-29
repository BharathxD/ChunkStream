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
  let video = await VideoModel.find({ published: true }).lean();
  //? Plain JavaScript Objects
  return video;
};
