import React from "react";
import { useRouter } from "next/router";

import { Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";

import { MADHHABS } from "src/constants";
import IssueDisplay from "components/IssueDisplay";
import AddIssueBtn from "components/Buttons/AddIssueBtn";
import useData from "hooks/useData";
import LoadingSkeleton from "components/LoadingSkeleton";

const Topic = () => {
  const router = useRouter();
  const { user } = Auth.useUser();

  const topic = router.query.topic;

  const [issues, loading, error, refetch] = useData(
    topic ? `issues?select=*&topic=eq.${topic}` : ""
  );

  const [topicData, tLoading, tError, tRefetch] = useData(
    topic ? `topics?select=*&id=eq.${topic}` : ""
  );

  React.useEffect(() => {
    if (!router.isReady) return;

    refetch();
    tRefetch();
  }, [router.isReady]);

  return (
    <Stack spacing={4}>
      {!tLoading && topicData ? (
        <>
          <Heading>{topicData[0].name}</Heading>
          <Text color="gray.500" fontSize={"lg"}>
            المذهب: {MADHHABS[topicData[0].madhhab]}
          </Text>
        </>
      ) : (
        <Skeleton>
          <Heading>Lorem.</Heading>
          <Text fontSize={"lg"}>lorem</Text>
        </Skeleton>
      )}

      {user && <AddIssueBtn madhhab={router.query.madhhab} />}

      {!loading && issues && (
        <>
          {issues.length === 0 ? (
            <Text fontSize={"lg"}>ما من مسائل هنا</Text>
          ) : (
            <IssueDisplay issues={issues} />
          )}
        </>
      )}

      {loading && <LoadingSkeleton variant="accordion" />}

      {(error || tError) && (
        <Heading>
          There was an error while fetching data. Check the console for more
          info.
        </Heading>
      )}
    </Stack>
  );
};

export default Topic;
