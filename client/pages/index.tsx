import HomePageLayout from "@/layout/HomePageLayout";
import { useVideo } from "@/context/Videos";
import { ReactElement } from "react";
import Video from "@/components/Videos/Video";
import { SimpleGrid } from "@mantine/core";

const Home = () => {
  const { videos } = useVideo();
  return (
    <SimpleGrid cols={3}>
      {(videos || []).map((video) => {
        return <Video key={video._id} video={video} />;
      })}
    </SimpleGrid>
  );
};

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
