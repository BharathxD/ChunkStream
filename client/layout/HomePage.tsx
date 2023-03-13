import { AppShell } from "@mantine/core";
import React from "react";
import NavBar from "./NavBar";
import HeaderLayout from "./Header";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell padding={"md"} navbar={<NavBar />} header={<HeaderLayout />}>
      {children}
    </AppShell>
  );
};

export default HomePage;
