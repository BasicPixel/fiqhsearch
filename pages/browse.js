import React from "react";

import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import app from "../src/client";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import useLocalStorage from "../hooks/useLocalStorage";

const Browse = ({ data }) => {
  const [maddhab, setMaddhab] = useLocalStorage("maddhab", "hanbali");

  return (
    <Container maxW={"full"} py={"6"}>
      <Stack spacing={4}>
        <Heading>تصفح المسائل</Heading>
        <Tabs>
          <TabList>
            {data.map((chapter) => (
              <Tab key={chapter.id}>{chapter.id}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {data.map((chapter) => (
              <TabPanel key={chapter.id}>
                {Object.keys(chapter).map((topic) => {
                  console.log(chapter[topic]);
                  return Object.keys(chapter[topic]).map((item) => item);
                  // return topic;
                })}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default Browse;

export async function getServerSideProps(context) {
  const querySnapshot = await getDocs(collection(getFirestore(app), "hanbali"));
  console.log(querySnapshot);

  const data = querySnapshot.docs.map((document) => {
    return { ...document.data(), id: document.id };
  });

  return {
    props: {
      data: data,
    },
  };
}
