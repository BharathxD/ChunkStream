import { VideoModel } from "./video.model";

export const createVideo = async ({ owner }: { owner: string }) => {
  return await VideoModel.create({ owner });
};
