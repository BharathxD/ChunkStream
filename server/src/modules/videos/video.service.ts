import { VideoModel } from "./video.model";

export const createVideo = ({ owner }: { owner: string }) => {
  return VideoModel.create({ owner });
};
