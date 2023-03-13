import HomePageLayout from "@/layout/HomePageLayout";
import { ReactElement } from "react";

const Home = () => {
  return <h1>Home Page</h1>;
};

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
