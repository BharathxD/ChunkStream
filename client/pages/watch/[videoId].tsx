import HomePageLayout from "@/layout/HomePageLayout";
import { Box, Card } from "@mantine/core";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Watch = () => {
  const { query } = useRouter();
  const videoSrc = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`;
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      try {
        if (query.videoId) {
          const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/video/${query.videoId}`;
          const response = await axios.get(endpoint);
          const data = await response.data;
          setData(data);
        }
      } catch (error: any) {
        console.log(`Error: ${error.message}`);
      }
    })();
  }, [query.videoId]);
  if (!query.videoId) {
    return null;
  }
  return (
    <Box p={"2.5rem"}>
      <Box>
        <h1>{data && data.title}</h1>
      </Box>
      <Box>
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
      </Box>
    </Box>
  );
};

Watch.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Watch;
