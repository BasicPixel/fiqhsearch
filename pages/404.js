import { Code, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <Stack textAlign={"center"} spacing={4} p={8}>
      <Heading>404 - Page Not Found</Heading>
      <Text fontSize={"lg"}>لم يتم العثور على الصفحة المطلوبة.</Text>
      <Text>
        الصفحة المطلوبة: <Code dir="ltr">{router.asPath}</Code>
      </Text>
    </Stack>
  );
}
