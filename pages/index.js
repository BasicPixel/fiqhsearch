import { Heading, Stack, Text } from "@chakra-ui/react";
import useLocalStorage from "../hooks/useLocalStorage";

import SearchForm from "../components/SearchForm";

export default function Home() {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");

  return (
    <>
      <Stack
        spacing={4}
        justifyContent={"center"}
        alignItems={"center"}
        py={"20"}
      >
        <Heading>الباحث الفقهي</Heading>
        <Text fontSize={"lg"}>
          خدمة تسهل الوصول إلى المسائل الفقهية حسب المذهب
        </Text>
        <SearchForm madhhab={madhhab} />
      </Stack>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
