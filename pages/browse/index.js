import { useRouter } from "next/router";
import { useEffect } from "react";

import { Spinner } from "@chakra-ui/react";

import useLocalStorage from "hooks/useLocalStorage";

const BrowseHome = () => {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");
  const router = useRouter();

  useEffect(() => {
    () => {
      router.push(`browse/${madhhab}`);
    };
  }, []);

  return <Spinner />;
};

export default BrowseHome;
