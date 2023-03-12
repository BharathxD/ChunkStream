import fs from "fs";
import busboy from "busboy";
import { NextFunction, Request, Response } from "express";
import { createVideo } from "./video.service";
import { StatusCodes } from "http-status-codes";
import { Video } from "./video.model";

const MIME_TYPES = ["video/mp4", "video/mov"];

const getPath = ({
  videoId,
  extension,
}: {
  videoId: Video["videoId"];
  extension: Video["extension"];
}) => {
  console.log(process.cwd());
  return `${process.cwd()}/videos/${videoId}.${extension}`;
};

export const uploadVideoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bb = busboy({ headers: req.headers });
  const user = res.locals.user;
  const video = await createVideo({ owner: user.decoded._id });
  bb.on("file", async (_, file, info) => {
    //? If the current videos mimeType doesn't include the required video extension, it returns an error message
    if (!MIME_TYPES.includes(info.mimeType)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "In valid file type" });
    }
    //? Extracting the of the obtained file
    const extension = info.mimeType.split("/")[1];
    //? Creating a file path
    const filePath = getPath({ videoId: video.videoId, extension });
    //? saving the path of the file in the MongoDB document
    video.extension = extension;
    await video.save();
    //? Using Writable Stream
    const stream = fs.createWriteStream(filePath);
    //? Pipe the file into the stream
    file.pipe(stream);
  });
  bb.on("close", () => {
    res.writeHead(StatusCodes.CREATED),
      {
        connection: "close",
        "Content-Type": "application/json",
      };
    res.write(JSON.stringify(video));
    res.end();
  });
  return req.pipe(bb);
};

export const updateVideoHandler = (req: Request, res: Response) => {
  const videoId = req.params;
};
