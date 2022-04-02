import { Heading, Stack, Text } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";

import supabase from "src/client";
import IssueDisplay from "components/IssueDisplay";
import { MADHHABS } from "src/constants";
import AddIssueBtn from "components/AddIssueBtn";
import { useRouter } from "next/router";

const Topic = ({ issues, topicData }) => {
  const router = useRouter();
  const { user } = Auth.useUser();

  return (
    <Stack spacing={4}>
      <Heading>{topicData.name}</Heading>
      <Text color="gray.500" fontSize={"lg"}>
        المذهب: {MADHHABS[topicData.madhhab]}
      </Text>
      {user && <AddIssueBtn madhhab={router.query.madhhab} />}
      {issues.length === 0 ? (
        <Text fontSize={"lg"}>ما من مسائل هنا</Text>
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
