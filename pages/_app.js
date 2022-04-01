import Head from "next/head";

import "@fontsource/tajawal";
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";

import { RtlProvider } from "components/rtl-provider";
import Navbar from "components/Navbar";
import "styles/globals.css";
import app from "src/client";

const theme = extendTheme({
  fonts: {
    heading: "Tajawal, sans-serif",
    body: "Tajawal, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
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
          <title>الباحث الفقهي</title>
          <meta
            name="description"
            content="خدمة تسهل الوصول إلى المسائل الفقهية على المذاهب الأربعة"
          />
        </Head>
        <Auth.UserContextProvider supabaseClient={app}>
          <Navbar />
          <Container pt={4}>
            <Component {...pageProps} />
          </Container>
        </Auth.UserContextProvider>
      </RtlProvider>
    </ChakraProvider>
  );
}

export default MyApp;
