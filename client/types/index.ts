export const enum QueryKeys {
  user = "user",
  videos = "videos",
}

export interface user {
  _id: string;
  email: string;
  username: string;
}

export interface Video {
  _id: string;
  owner: string;
  published: boolean;
  videoId: string;
  createdAt: Date;
  updateAt: Date;
  __v: number;
  extension: string;
  description: string;
  title: string;
}
