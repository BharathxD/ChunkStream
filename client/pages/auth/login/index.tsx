import React from "react";
import Head from "next/head";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { loginUser } from "@/api";
import { showNotification } from "@mantine/notifications";

const Login = () => {
  const router = useRouter();
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const mutator = useMutation<
    string,
    AxiosError,
    Parameters<typeof loginUser>["0"]
  >(loginUser, {
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      showNotification({
        id: "login",
        title: "Failed",
        message: "Something went Wrong",
      });
    },
  });
  return (
    <>
      <Head>
        <title>Login User</title>
      </Head>
      <Container>
        <Title>Login</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius={"md"}>
          <form
            onSubmit={loginForm.onSubmit((values) => {
              mutator.mutate(values);
            })}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder="Joe@example.com"
                required
                {...loginForm.getInputProps("email")}
              ></TextInput>
              <PasswordInput
                label="Password"
                placeholder="Password"
                required
                {...loginForm.getInputProps("password")}
              ></PasswordInput>
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
