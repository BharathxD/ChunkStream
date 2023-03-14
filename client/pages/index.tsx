import HomePageLayout from "@/layout/HomePageLayout";
import { useVideo } from "@/context/Videos";
import { ReactElement } from "react";
import Video from "@/components/Videos/Video";
import { SimpleGrid } from "@mantine/core";

const Home = () => {
  const { videos } = useVideo();
  const Videos = (videos || []).map((video) => {
    return (
      <SimpleGrid cols={3} key={video._id} mb={10}>
        <Video video={video}></Video>
      </SimpleGrid>
    );
  });
  return <>{Videos}</>;
};

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
