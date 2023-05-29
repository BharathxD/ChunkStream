import { user } from "@/types";
import { Box, Button, Flex, Header, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UploadVideo from "@/components/video/UploadVideo";
import { useRouter } from "next/router";

const HeaderLayout = ({
  user,
}: {
  user: { valid: boolean; expired: boolean; decoded: user };
}) => {
  const router = useRouter();
  const [valid, setValid] = useState<boolean | undefined>(false);
  useEffect(() => {
    setValid(user?.valid);
  }, [user?.valid]);

  return (
    <Header
      height={"50"}
      bg={"rgba( 255, 255, 255, 0.25 )"}
      sx={{
        backdropFilter: "blur(4px)",
      }}
    >
      <Flex justify={"space-between"} align={"center"} pl={"md"} pr={"md"}>
        <Box>
          <h1 onClick={() => router.push("/")}>ChunkTube</h1>
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
