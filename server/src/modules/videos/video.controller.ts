import fs from "fs";
import busboy from "busboy";
import { NextFunction, Request, Response } from "express";
import { createVideo, findVideo, findVideos } from "./video.service";
import { StatusCodes } from "http-status-codes";
import { Video } from "./video.model";
import { UpdateVideoBody, UpdateVideoParams } from "./video.schema";
import { min } from "lodash";

const MIME_TYPES = ["video/mp4", "video/mov"];

const CHUNK_SIZE_IN_BYTES = 1000 * 1000; //? 1 MB
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

export const updateVideoHandler = async (
  req: Request<UpdateVideoParams, {}, UpdateVideoBody>,
  res: Response
) => {
  const videoId = req.params;
  const { title, description, published } = req.body;
  const { _id: userId } = res.locals.user;
  const video = await findVideo(videoId);
  if (!video) {
    res.status(StatusCodes.NOT_FOUND).send({ message: "Video not found" });
    return;
  }
  if (String(video.owner) !== String(userId)) {
    res.status(StatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
    return;
  }
  video.title = title;
  video.description = description;
  video.published = published;
  await video.save();
  return res.status(StatusCodes.OK).send(video);
};

export const findVideosHandler = async (_: Request, res: Response) => {
  const videos = await findVideos();
  return res.status(StatusCodes.OK).send(videos);
};

export const streamVideoHander = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  //? Range header specifies what path of the header should be returned
  const range = req.headers.range;
  //? It is gonna specify which chunk of the video to send
  if (!range) {
    //? If range is not specified
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Range must be provided" });
    return;
  }
  //? Fetching the Video with the id VideoId from the database
  const video = await findVideo({ videoId });
  if (!video) {
    //? If video doesn't exists in the database
    res.status(StatusCodes.NOT_FOUND).send({ message: "Video not found" });
    return;
  }
  //? Getting the path of the video file
  const filePath = getPath({
    videoId: video.videoId,
    extension: video.extension,
  });
  const fileSizeInBytes = fs.statSync(filePath).size;
  const chunkStart = Number(range.replace(/\D/g, ""));
  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    fileSizeInBytes - 1
  );
  const contentLength = chunkEnd - chunkStart + 1;
  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${fileSizeInBytes}`,
    "Accept-Ranges": `bytes`,
    "Content-Length": contentLength,
    "Content-Type": `video/${video.extension}`,
  };
  res.writeHead(StatusCodes.PARTIAL_CONTENT, headers);
  const videoStream = fs.createReadStream(filePath, {
    start: chunkStart,
    end: chunkEnd,
  });
  videoStream.pipe(res);
};
