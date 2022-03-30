import { useRouter } from "next/router";
import { useEffect } from "react";

import { Heading } from "@chakra-ui/react";

import useLocalStorage from "hooks/useLocalStorage";

const BrowseHome = () => {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");
  const router = useRouter();

  useEffect(() => {
    () => {
      router.push(`browse/${madhhab}`);
    };
  }, []);

  return <Heading textAlign={"center"}>جارٍ التحميل...</Heading>;
};

export default BrowseHome;
