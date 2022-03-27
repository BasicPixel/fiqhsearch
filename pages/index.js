import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Search from "../components/Search";
import useLocalStorage from "../hooks/useLocalStorage";

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
        <Search />
        <Link href={`/browse/${madhhab}`} passHref>
          <Button colorScheme="blue">تصفح المسائل</Button>
        </Link>
      </Stack>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
