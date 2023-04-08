import { getVideos } from "@/api";
import { Loader } from "@mantine/core";
import { QueryKeys, Video } from "@/types";
import { createContext, useContext } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "react-query";

const videoContext = createContext<{
  videos: Video[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  //@ts-ignore
}>(null);

export const VideoContextProvidor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading, refetch } = useQuery(QueryKeys.videos, getVideos);
  const values = {
    videos: data,
    refetch,
  };
  return (
    <videoContext.Provider value={values}>{children}</videoContext.Provider>
  );
};

export const useVideo = () => useContext(videoContext);

export default VideoContextProvidor;
