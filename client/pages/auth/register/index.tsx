import React from "react";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { registerUser } from "@/api";
import { AxiosError } from "axios";
import Head from "next/head";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "Creating Account",
        message: "Please wait...",
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: "register",
        title: "Success",
        message: "Succesfully created the Account",
        loading: false,
      });
      router.push("/auth/login");
    },
    onError: () => {
      updateNotification({
        id: "register",
        title: "Error",
        message: "Could not create the Account",
        loading: false,
      });
    },
  });
  return (
    <>
      <Head>
        <title>Register User</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius={"md"}>
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="Joe@example.com"
                required
                {...form.getInputProps("email")}
              ></TextInput>
              <TextInput
                label="Username"
                placeholder="Username"
                required
                {...form.getInputProps("username")}
              ></TextInput>
              <PasswordInput
                label="Password"
                placeholder="Password"
                required
                {...form.getInputProps("password")}
              ></PasswordInput>
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm Password"
                required
                {...form.getInputProps("confirmPassword")}
              ></PasswordInput>
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Register;