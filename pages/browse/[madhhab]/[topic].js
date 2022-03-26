import React from "react";

import { Heading, Stack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { useRouter } from "next/router";

import { FiCornerDownLeft } from "react-icons/fi";
import { useContext } from "react/cjs/react.production.min";
import { useData } from "../../../hooks/useData";

const Topic = () => {
  const router = useRouter();

  const data = useData();
  console.log("🚀 ~ file: [topic].js ~ line 16 ~ Topic ~ data", data);

  return (
    <Stack spacing={4}>
      <NextLink href={`/browse/${router.query.madhhab}`} passHref>
        <Link display={"flex"} alignItems="center" gap={2}>
          <FiCornerDownLeft /> تصفح جميع المسائل
        </Link>
      </NextLink>
      <Heading>{router.query.topic}</Heading>
    </Stack>
  );
};

export default Topic;
