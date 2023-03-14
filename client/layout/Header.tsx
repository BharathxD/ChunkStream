import { user } from "@/types";
import { Box, Button, Flex, Header } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UploadVideo from "@/components/video/UploadVideo";

const HeaderLayout = ({
  user,
}: {
  user: { valid: boolean; expired: boolean; decoded: user };
}) => {
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    setValid(user.valid);
  }, [user.valid]);

  return (
    <Header height={"50"}>
      <Flex justify={"space-between"} align={"center"} pl={"md"} pr={"md"}>
        <Box>
          <h1>ChunkTube</h1>
        </Box>
        <Box>
          {!valid && (
            <>
              <Link href="auth/login" passHref>
                <Button mr={"5px"}>Login</Button>
              </Link>
              <Link href="auth/register" passHref>
                <Button>Register</Button>
              </Link>
            </>
          )}
          {valid && <UploadVideo />}
        </Box>
      </Flex>
    </Header>
  );
};

export default HeaderLayout;
