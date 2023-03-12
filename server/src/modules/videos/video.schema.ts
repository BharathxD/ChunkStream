import { object, string, boolean, TypeOf } from "zod";

const UpdateVideoSchema = {
  body: object({
    title: string(),
    description: string(),
    published: boolean(),
  }),
  params: object({
    videoID: string(),
  }),
};

export type UpdateVideoBody = TypeOf<typeof UpdateVideoSchema.body>;
export type UpdateVideoParams = TypeOf<typeof UpdateVideoSchema.params>;
