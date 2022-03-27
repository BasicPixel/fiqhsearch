import React from "react";
import { useRouter } from "next/router";

import { Container, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import supabase from "../../../src/client";

import Card from "../../../components/Card";

const Browse = ({ data }) => {
  const router = useRouter();

  return (
    <Container maxW={"full"} py={"6"}>
      <Stack spacing={4}>
        <Heading>أقسام المسائل</Heading>
        <Flex py={4} gap={4} flexWrap="wrap">
          {data.length === 0 ? (
            <Text fontSize={"lg"}>ما من أقسام هنا...</Text>
          ) : (
            data.map((el) => (
              <Link key={el.id} href={`${router.query.madhhab}/${el.id}`}>
                <Card>
                  <Text fontSize={"xl"}>{el.name}</Text>
                </Card>
              </Link>
            ))
          )}
        </Flex>
      </Stack>
    </Container>
  );
};

export default Browse;

export async function getServerSideProps(context) {
  const { data, error } = await supabase
    .from("sections")
    .select()
    .eq("madhhab", context.query.madhhab);

  return {
    props: { data },
  };
}
