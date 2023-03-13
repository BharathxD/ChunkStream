import { Group } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import React, { ReactNode } from "react";
import { ArrowBigUpLine } from "tabler-icons-react";
import { Text } from "@mantine/core";

const VIDEO_TYPE = ["mp4", "mov"];

const DropZoneInnerContent = (status) => {
  return (
    <Group
      position="center"
      spacing={"xl"}
      style={{
        minHeight: "50vh",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ArrowBigUpLine />
      <Text>Drag video here, or click to choose</Text>
    </Group>
  );
};

const UploadVideoDropZone = () => {
  return (
    <Dropzone onDrop={(files) => {}} accept={VIDEO_TYPE} multiple={false}>
      {<DropZoneInnerContent status={status}/>}
    </Dropzone>
  );
};

export default UploadVideoDropZone;
