import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { v4 as uuidv4 } from "uuid";

const id = uuidv4(); // generates a unique ID

export class Video {
  @prop()
  public title!: string;
  @prop()
  public description!: string;
  @prop({ enum: ["mp4", "mov"] })
  public extension!: string;
  @prop({ required: true, ref: () => User })
  public owner!: Ref<User>;
  @prop({ unique: true, default: () => id })
  public videoId!: string;
  @prop({ default: false })
  public published!: boolean;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
