import HomePageLayout from "@/layout/HomePageLayout";
import { useVideo } from "@/context/Videos";
import { ReactElement } from "react";

const Home = () => {
  const { videos } = useVideo();
  return <p>{JSON.stringify(videos)}</p>;
};

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
