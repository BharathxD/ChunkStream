export const enum QueryKeys {
  user = "user",
  videos = "videos",
}

export interface user {
  _id: string;
  email: string;
  username: string;
}