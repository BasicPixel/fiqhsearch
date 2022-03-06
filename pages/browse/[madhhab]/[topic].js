import { Heading, Stack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Topic = () => {
  const router = useRouter();

  return (
    <Stack spacing={4}>
      <NextLink href={`/browse/${router.query.madhhab}`} passHref>
        <Link>تصفح جميع المسائل...</Link>
      </NextLink>
      <Heading>{router.query.topic}</Heading>
    </Stack>
  );
};

export default Topic;
