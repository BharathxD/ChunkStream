import { getVideo } from "@/api";
import HomePageLayout from "@/layout/HomePageLayout";
import { Box, Card, Divider, Flex, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Watch = () => {
  const { query } = useRouter();
  const videoSrc = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`;
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      if (query.videoId) {
        const data = await getVideo({ videoId: query.videoId });
        setData(data);
      }
    })();
  }, [query.videoId]);
  if (!query.videoId) {
    return null;
  }
  return (
    <Card withBorder radius="md" p="md" mb="10rem">
      <Flex mih={100} gap="lg" justify="center" direction="column" wrap="wrap">
        <Box>
          <Title order={2}>{data?.title}</Title>
        </Box>
        <Card
          withBorder
          radius="lg"
          p="md"
          sx={{
            height: "35rem",
            aspectRatio: "16/9",
          }}
        >
          <ReactPlayer
            url={videoSrc}
            controls={true}
            playing={false}
            width={"100%"}
            height={"100%"}
            muted={false}
          />
        </Card>
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
