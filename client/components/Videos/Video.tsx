import { Video } from "@/types";
import Link from "next/link";
import React from "react";
import { Card, Text } from "@mantine/core";

const Video = ({ video }: { video: Video }) => {
  return (
    <Card
      shadow="sm"
      p="xl"
      component="a"
      href={`/watch/${video.videoId}`}
      withBorder
    >
      <Text weight={500} size="lg">
        {video.title}
      </Text>
      <Text size="sm">{video.description}</Text>
    </Card>
  );
};

export default Video;
