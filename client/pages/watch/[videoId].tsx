import { useRouter } from "next/router";
import React from "react";

const Watch = () => {
  const { query } = useRouter();
  return (
    <>
      <video
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
        width={800}
        height={"auto"}
        controls
        autoPlay
        id="video-player"
      ></video>
    </>
  );
};

export default Watch;
