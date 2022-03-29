import {
  Button,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import useLocalStorage from "../hooks/useLocalStorage";

import { FiSearch, FiBookOpen } from "react-icons/fi";

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
        <form action={`/search`}>
          <SimpleGrid gap={2} columns={2} width="full">
            <GridItem colSpan={2}>
              <SearchBar />
            </GridItem>
            <Button rightIcon={<FiSearch />} colorScheme="teal" type="submit">
              البحث
            </Button>
            <Link href={`/browse/${madhhab}`} passHref>
              <Button colorScheme="blue" rightIcon={<FiBookOpen />}>
                تصفح جميع المسائل
              </Button>
            </Link>
          </SimpleGrid>
        </form>
      </Stack>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
