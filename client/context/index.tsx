import { getUser } from "@/api";
import { QueryKeys, user } from "@/types";
import { Loader } from "@mantine/core";
import { ReactNode, createContext, useContext } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "react-query";

const UserContext = createContext<{
  user: user;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  //@ts-ignore
}>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery(QueryKeys.user, getUser);
  return (
    <UserContext.Provider value={{ user: data, refetch }}>
      {isLoading && <Loader />}
      {!isLoading && children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };
