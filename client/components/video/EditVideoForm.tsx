import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction } from "react";

const EditVideoForm = ({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
    },
  });
  return (
    <>
      <form></form>
    </>
  );
};
