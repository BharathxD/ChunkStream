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
import { redirect } from "next/dist/server/api-utils";

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
    onMutate: () => {},
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {},
  });
  return (
    <>
      <Head>
        <title>Register User</title>
      </Head>
      <Container>
        <Title>Register</Title>
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
              ></TextInput>
              <TextInput
                label="Username"
                placeholder="Username"
                required
              ></TextInput>
              <PasswordInput
                label="Password"
                placeholder="Password"
                required
              ></PasswordInput>
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm Password"
                required
              ></PasswordInput>
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
