import { AppShell } from "@mantine/core";
import React from "react";
import HeaderLayout from "./Header";
import { useUser } from "@/context";
import Footer from "./Footer";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return (
    <AppShell>
      <HeaderLayout user={user} />
      {children}
      <Footer />
    </AppShell>
  );
};

export default HomePageLayout;
