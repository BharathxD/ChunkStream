import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

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
        theme={{ colorScheme: "light" }}
      >
          {getLayout(
            <main>
              <Component {...pageProps} />
            </main>
          )}
      </MantineProvider>
    </>
  );
}
