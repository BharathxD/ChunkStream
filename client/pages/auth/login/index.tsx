import React from "react";
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

const Login = () => {
  return (
    <>
      <Head>
        <title>Register User</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius={"md"}>
          <form onSubmit={() => {}}>
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
