import React from "react";

import { Heading, Stack, Text } from "@chakra-ui/react";

import supabase from "../../../../src/client";
import IssueDisplay from "../../../../components/IssueDisplay";

import { MADHHABS } from "../../../../src/constants";

const Topic = ({ issues, topicData }) => {
  return (
    <Stack spacing={4}>
      <Heading>{topicData.name}</Heading>
      <Text color="gray.500" fontSize={"lg"}>
        المذهب: {MADHHABS[topicData.madhhab]}
      </Text>
      {issues.length === 0 ? (
        <>ما من مسائل هنا</>
      ) : (
        <IssueDisplay issues={issues} />
      )}
    </Stack>
  );
};

export default Topic;

export async function getServerSideProps(context) {
  const { data: issues } = await supabase
    .from("issues")
    .select()
    .eq("topic", context.query.topic);

  const { data: topicData } = await supabase
    .from("topics")
    .select()
    .eq("id", context.query.topic)
    .single();

  return {
    props: { issues, topicData },
  };
}
