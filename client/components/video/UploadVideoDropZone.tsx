import { Group, Progress } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ArrowBigUpLine } from "tabler-icons-react";
import { Text } from "@mantine/core";
import { useMutation } from "react-query";
import { uploadVideo } from "@/api";
import EditVideoForm from "./EditVideoForm";

const DropZoneInnerContent = () => {
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

const UploadVideoDropZone = ({
  setOpened,
}: {
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const [progress, setProgress] = useState(0);
  const mutation = useMutation(uploadVideo);
  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    },
  };
  const upload = (files: File[]) => {
    const formData = new FormData();
    formData.append("video", files[0]);
    mutation.mutate({ formData, config });
  };
  return (
    <>
      {progress === 0 && (
        <Dropzone
          onDrop={(files: File[]) => {
            upload(files);
          }}
          accept={[MIME_TYPES.mp4]}
          multiple={false}
        >
          {<DropZoneInnerContent />}
        </Dropzone>
      )}
      {progress > 0 && (
        <Progress
          size={"xl"}
          label={`${progress}%`}
          value={progress}
          mb="xl"
          mt="md"
        ></Progress>
      )}
      {mutation.data && (
        <EditVideoForm videoId={mutation.data.videoId} setOpened={setOpened} />
      )}
    </>
  );
};

export default UploadVideoDropZone;
