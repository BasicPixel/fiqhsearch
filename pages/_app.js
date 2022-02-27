import Head from "next/head";
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { RtlProvider } from "../components/rtl-provider";
import Navbar from "../components/Navbar";

const theme = extendTheme({
  config: { useSystemColorMode: true },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
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
          <Container>
            <Component {...pageProps} />
          </Container>
        </RtlProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
