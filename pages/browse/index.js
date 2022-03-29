import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";

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
