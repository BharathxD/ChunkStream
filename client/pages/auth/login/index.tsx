import React from "react";
import Head from "next/head";
import { Text } from "@mantine/core";
import {
  Anchor,
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
import Link from "next/link";

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
    <Container size={420} my={40}>
      <Head>
        <title>Login</title>
      </Head>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Hello, There!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href={"/auth/register"} passHref>
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Link>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius={"lg"}>
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
  );
};

export default Login;
