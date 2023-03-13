import { user } from "@/types";
import { Anchor, Box, Button, Flex, Header } from "@mantine/core";
import React from "react";
import Link from "next/link";

const HeaderLayout = ({ user }: { user: user }) => {
  return (
    <Header height={"50"}>
      <Flex justify={"space-between"} align={"center"} pl={"md"} pr={"md"}>
        <Box>
          <h1>ChunkTube</h1>
        </Box>
        <Box>
          {!user && (
            <>
              <Link href="auth/login" passHref>
                <Button mr={"5px"}>Login</Button>
              </Link>
              <Link href="auth/register" passHref>
                <Button>Register</Button>
              </Link>
            </>
          )}
          {user && <p>Upload a video</p>}
        </Box>
      </Flex>
    </Header>
  );
};

export default HeaderLayout;
