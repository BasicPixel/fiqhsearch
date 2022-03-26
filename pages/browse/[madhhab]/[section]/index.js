import React from "react";

import { Container, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";

import NextLink from "next/link";
import supabase from "../../../../src/client";

import { useRouter } from "next/router";

import { FiCornerDownLeft } from "react-icons/fi";
import Card from "../../../../components/Card";

const Topic = ({ data, name }) => {
  const router = useRouter();

  return (
    <Stack spacing={4}>
      <NextLink href={`/browse/${router.query.madhhab}`} passHref>
        <Link display={"flex"} alignItems="center" gap={2}>
          <FiCornerDownLeft /> تصفح جميع المسائل
        </Link>
      </NextLink>
      <Heading>{name}</Heading>
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
  const { data, error } = await supabase
    .from("topics")
    .select()
    .eq("section", context.query.section);

  const { data: sectionName } = await supabase
    .from("sections")
    .select("name")
    .eq("id", context.query.section)
    .single();

  console.log(sectionName);

  return {
    props: { data, name: sectionName.name }, // will be passed to the page component as props
  };
}
