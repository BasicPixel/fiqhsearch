import React from "react";

import { Container, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import Card from "../../../components/Card";

import app from "../../../src/client";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";

const Browse = ({ data }) => {
  const router = useRouter();

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

export async function getServerSideProps(context) {
  const { madhhab } = context.query;
  const querySnapshot = await getDocs(collection(getFirestore(app), madhhab));

  const data = querySnapshot.docs.map((document) => {
    return { ...document.data(), id: document.id };
  });

  return { props: { data } };
}
