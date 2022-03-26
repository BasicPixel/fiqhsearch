import React from "react";
import { useRouter } from "next/router";

import { Container, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";

import Card from "../../../components/Card";

import { useData } from "../../../hooks/useData";

const Browse = () => {
  const router = useRouter();
  const data = useData();

  console.log(data);

  return (
    <Container maxW={"full"} py={"6"}>
      <Stack spacing={4}>
        <Heading>تصفح المسائل</Heading>
        <Flex py={4} gap={4} flexWrap="wrap">
          {data.map((el) => (
            <Link key={el.id} href={`${router.query.madhhab}/${el.id}`}>
              <Card>
                <Text fontSize={"xl"}>{el.id}</Text>
              </Card>
            </Link>
          ))}
        </Flex>
      </Stack>
    </Container>
  );
};

export default Browse;
