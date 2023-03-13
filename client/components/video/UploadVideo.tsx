import { Modal } from "@mantine/core";
import { Button } from "@mantine/core";
import React, { useState } from "react";
import { Upload } from "tabler-icons-react";
import { ButtonProps } from "@mantine/core";
import UploadVideoDropZone from "./UploadVideoDropZone";

type UploadVideoButtonProps = ButtonProps & {
  onClick: () => void;
};

export function UploadVideoButton(props: UploadVideoButtonProps) {
  return (
    <Button
      {...props}
      rightIcon={<Upload size="1rem" />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        color: "#fff",
        "&:hover": {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        },
      })}
    />
  );
}

const UploadVideo = () => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title="Upload Video"
        size={"xl"}
      >
        <UploadVideoDropZone setOpened={setOpened} />
      </Modal>
      <UploadVideoButton onClick={() => setOpened(true)} color="green">
        Upload a video
      </UploadVideoButton>
    </>
  );
};

export default UploadVideo;
