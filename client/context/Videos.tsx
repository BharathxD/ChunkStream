import { getVideos } from "@/api";
import { QueryKeys, Video } from "@/types";
import { createContext } from "react";
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

const ContextProvidor = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, refetch } = useQuery(QueryKeys.videos, getVideos);
  const values = {
    videos: data,
    refetch,
  };
  return (
    <videoContext.Provider values={values}>{children}</videoContext.Provider>
  );
};
