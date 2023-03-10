import { AppShell } from "@mantine/core";
import React from "react";
import NavBar from "./NavBar";
import HeaderLayout from "./Header";
import { useUser } from "@/context";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return (
    <AppShell
      padding={"md"}
      navbar={<NavBar />}
      header={<HeaderLayout user={user} />}
    >
      {children}
    </AppShell>
  );
};

export default HomePageLayout;
