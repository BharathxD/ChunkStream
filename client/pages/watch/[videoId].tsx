import HomePageLayout from "@/layout/HomePageLayout";
import { Box, Card, Divider, Flex, Text, Title } from "@mantine/core";
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
    <Card withBorder radius="md" p="md">
      <Flex mih={100} gap="lg" justify="center" direction="column" wrap="wrap">
        <Box>
          <Title order={2}>{data?.title}</Title>
        </Box>
        <Box>
          <ReactPlayer
            style={{
              aspectRatio: "16/9",
            }}
            url={videoSrc}
            controls={true}
            playing={false}
            muted={false}
          />
        </Box>
        <Box>
          <Divider my="sm" />
          <Text mt="md" c="dimmed">
            {data?.description}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

Watch.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Watch;
