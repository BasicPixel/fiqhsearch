import { Heading, Stack, Text } from "@chakra-ui/react";

import SearchForm from "components/Search/SearchForm";

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
        <Text fontSize={"lg"}>
          خدمة تسهل الوصول إلى المسائل الفقهية على المذاهب الأربعة
        </Text>
        <SearchForm />
      </Stack>
    </>
  );
}
