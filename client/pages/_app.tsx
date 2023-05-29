import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "@/context";
import VideoContextProvidor from "@/context/Videos";

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  //? Addign get Layout into the NextPage props
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  //? Including the modified component into the App props
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>ChunkTube</title>
        <meta
          name="viewport"
          content="minimum-scalable=1, initial-scale=1, width=device-width"
        ></meta>
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light", fontFamily: 'montserrat, sans-serif', }}
      >
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <UserContextProvider>
            <VideoContextProvidor>
              {getLayout(
                <main>
                  <Component {...pageProps} />
                </main>
              )}
            </VideoContextProvidor>
          </UserContextProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
