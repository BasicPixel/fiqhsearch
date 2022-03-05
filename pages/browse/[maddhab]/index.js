import React from "react";

import {
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Card from "../../../components/Card";

import app from "../../../src/client";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";

import Custom404 from "../../404";

const Browse = ({ data }) => {
  const router = useRouter();

  if (
    ["hanbali", "shafi'i", "hanafi", "maliki"].includes(router.query.maddhab)
  ) {
    return (
      <Container maxW={"full"} py={"6"}>
        <Stack spacing={4}>
          <Heading>تصفح المسائل</Heading>
          <SimpleGrid py={4} columns={2} gap={4}>
            {data.map((el) => (
              <Link key={el.id} href={`${router.query.maddhab}/${el.id}`}>
                <Card>
                  <Text fontSize={"xl"}>{el.id}</Text>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    );
  } else {
    return <Custom404 />;
  }
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
