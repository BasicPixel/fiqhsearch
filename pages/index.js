import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import Search from "../components/Search";

export default function Home() {
  return (
    <>
      <Stack
        spacing={4}
        justifyContent={"center"}
        alignItems={"center"}
        py={"20"}
      >
        <Heading>الباحث الفقهي</Heading>
        <Text>خدمة تسهل الوصول إلى المسائل الفقهية حسب المذهب</Text>
        <Search />
        <Button colorScheme="blue">تصفح المسائل</Button>
      </Stack>
    </>
  );
}
