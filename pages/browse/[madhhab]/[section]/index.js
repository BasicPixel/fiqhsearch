import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { FiCornerDownLeft } from "react-icons/fi";
import { Auth } from "@supabase/ui";

import supabase from "src/client";
import Card from "components/Card";
import AddTopicBtn from "components/Buttons/AddTopicButton";

const Topic = ({ data, name }) => {
  const router = useRouter();
  const { user } = Auth.useUser();

  return (
    <Stack spacing={4}>
      <NextLink href={`/browse/${router.query.madhhab}`} passHref>
        <Link display={"flex"} alignItems="center" gap={2}>
          <FiCornerDownLeft /> تصفح جميع المسائل
        </Link>
      </NextLink>
      <Heading>{name}</Heading>
      {user && <AddTopicBtn madhhab={router.query.madhhab} />}
      <Flex py={4} gap={4} flexWrap="wrap">
        {data.length === 0 ? (
          <Text fontSize={"lg"}>ما من أبواب هنا...</Text>
        ) : (
          data.map((el) => (
            <Link key={el.id} href={`${router.query.section}/${el.id}`}>
              <Card>
                <Text fontSize={"xl"}>{el.name}</Text>
              </Card>
            </Link>
          ))
        )}
      </Flex>
    </Stack>
  );
};

export default Topic;

export async function getServerSideProps(context) {
  const { data } = await supabase
    .from("topics")
    .select()
    .eq("section", context.query.section);

  const { data: sectionName } = await supabase
    .from("sections")
    .select("name")
    .eq("id", context.query.section)
    .single();

  return {
    props: { data, name: sectionName.name },
  };
}
