import { updateVideo } from "@/api";
import { Video } from "@/types";
import { Button, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { Stack } from "@mantine/core";

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
  type input = Parameters<typeof updateVideo>["0"];
  const mutation = useMutation<AxiosResponse<Video>, AxiosError, input>(
    updateVideo,
    {
      onSuccess: () => {
        setOpened(false);
      },
    }
  );
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutation.mutate({ videoId, ...values })
      )}
    >
      <Stack>
        <TextInput
          label="Title"
          placeholder="Video"
          required
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Description"
          placeholder="Description"
          required
          {...form.getInputProps("description")}
        />
        <Switch label="Published" {...form.getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};

export default EditVideoForm;
