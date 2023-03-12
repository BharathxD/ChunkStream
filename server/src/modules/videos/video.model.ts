import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvxyz", 10);

export class Video {
  @prop({ required: true })
  public title!: string;
  @prop({ required: true })
  public description!: string;
  @prop({ required: true, enum: ["mp4", "mov"] })
  public extension!: string;
  @prop({ required: true, ref: () => User })
  public owner!: Ref<User>;
  @prop({ unique: true, default: () => nanoid() })
  public videoId!: string;
  @prop({ default: false })
  public published!: boolean;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
