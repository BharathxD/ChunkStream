import HomePageLayout from "@/layout/HomePageLayout";
import { Card } from "@mantine/core";
import { useRouter } from "next/router";
import React, { Fragment, ReactElement } from "react";
import ReactPlayer from "react-player";

const Watch = () => {
  const { query } = useRouter();
  const videoSrc = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`;
  if (!query.videoId) {
    return null;
  }
  return (
    <Card w="100%" h="100vh" display="flex" padding={"2rem"}>
      <Card>
        <ReactPlayer
          style={{
            aspectRatio: "16/9",
            borderRadius: "1rem",
          }}
          url={videoSrc}
          controls={true}
          playing={false}
          muted={false}
        />
      </Card>
    </Card>
  );
};

Watch.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Watch;
