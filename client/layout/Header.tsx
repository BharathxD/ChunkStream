import { Box, Flex, Header } from "@mantine/core";
import React from "react";

const HeaderLayout = () => {
  return (
    <Header height={"60"} p={"sm"}>
      <Flex justify={"flex-start"} align={"center"}>
        <Box>
          <h1>ChunkTube</h1>
        </Box>
      </Flex>
    </Header>
  );
};

export default HeaderLayout;
