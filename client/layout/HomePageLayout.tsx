import { AppShell } from "@mantine/core";
import React from "react";
import NavBar from "./NavBar";
import HeaderLayout from "./Header";
import { useUser } from "@/context";
import Footer from "./Footer";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return (
    <AppShell
      padding={"md"}
      header={<HeaderLayout user={user} />}
      footer={<Footer />}
    >
      {children}
    </AppShell>
  );
};

export default HomePageLayout;
