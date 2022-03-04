import React from "react";

import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Card from "../../../components/Card";

import app from "../../../src/client";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const Browse = ({ data }) => {
  return (
    <Container maxW={"full"} py={"6"}>
      <Stack spacing={4}>
        <Heading>تصفح المسائل</Heading>
        <SimpleGrid py={4} columns={2} gap={4}>
          {data.map((el) => (
            <Card key={el.id}>
              <Text fontSize={"xl"}>{el.id}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Browse;

export async function getServerSideProps(context) {
  const { maddhab } = context.query;
  const querySnapshot = await getDocs(collection(getFirestore(app), maddhab));

  const data = querySnapshot.docs.map((document) => {
    return { ...document.data(), id: document.id };
  });

  return { props: { data } };
}
