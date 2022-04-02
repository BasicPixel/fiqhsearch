import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Flex, Heading, Link, Skeleton, Stack, Text } from "@chakra-ui/react";
import { FiCornerDownLeft } from "react-icons/fi";
import { Auth } from "@supabase/ui";

import AddTopicBtn from "components/Buttons/AddTopicButton";
import LoadingSkeleton from "components/LoadingSkeleton";
import Card from "components/Card";
import useData from "hooks/useData";

const Topic = () => {
  const router = useRouter();

  const madhhab = router.query.madhhab;
  const section = router.query.section;

  const { user } = Auth.useUser();

  const [data, loading, error, refetch] = useData(
    section ? `topics?select=*&section=eq.${section}` : ""
  );

  const [sectionName, nameLoading, nameError, refetchName] = useData(
    section ? `sections?select=name&id=eq.${section}` : ""
  );

  React.useEffect(() => {
    // https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render

    if (!router.isReady) return;

    refetch();
    refetchName();
  }, [router.isReady]);

  return (
    <Stack spacing={4}>
      <NextLink href={`/browse/${madhhab}`} passHref>
        <Link display={"flex"} alignItems="center" gap={2}>
          <FiCornerDownLeft /> تصفح جميع المسائل
        </Link>
      </NextLink>

      {!nameLoading && sectionName ? (
        <Heading>{sectionName[0]?.name}</Heading>
      ) : (
        <Skeleton>
          <Heading>Lorem.</Heading>
        </Skeleton>
      )}

      {user && <AddTopicBtn madhhab={madhhab} />}

      {!loading && data && !error && (
        <Flex py={4} gap={4} flexWrap="wrap">
          {data.length === 0 ? (
            <Text fontSize={"lg"}>ما من أبواب هنا...</Text>
          ) : (
            data.map((el) => (
              <Link key={el.id} href={`${section}/${el.id}`}>
                <Card>
                  <Text fontSize={"xl"}>{el.name}</Text>
                </Card>
              </Link>
            ))
          )}
        </Flex>
      )}

      {loading && <LoadingSkeleton />}

      {(error || nameError) && (
        <Heading>
          There was an error while fetching data. Check the console for more
          info.
        </Heading>
      )}
    </Stack>
  );
};

export default Topic;
