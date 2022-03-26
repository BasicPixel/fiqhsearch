import Head from "next/head";

import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import "@fontsource/tajawal";

import { RtlProvider } from "../components/rtl-provider";
import Navbar from "../components/Navbar";
import { DataContext } from "../hooks/useData";
import { useState, useEffect, useContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const theme = extendTheme({
  fonts: {
    heading: "Tajawal, sans-serif",
    body: "Tajawal, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");
  const [data, setData] = useState();
  const contextData = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/issues/${madhhab}`);
      const apiData = await res.json();

      setData(apiData);
    };

    if (!contextData) {
      fetchData();
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <RtlProvider>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest"></link>
        </Head>
        <Navbar />
        {data && (
          <DataContext.Provider value={data}>
            <Container pt={4}>
              <Component {...pageProps} />
            </Container>
          </DataContext.Provider>
        )}
      </RtlProvider>
    </ChakraProvider>
  );
}

export default MyApp;
