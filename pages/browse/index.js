import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";

const BrowseHome = () => {
  const [maddhab] = useLocalStorage("maddhab", "hanbali");
  const router = useRouter();

  router.push(`browse/${maddhab}`);
  return <Heading textAlign={"center"}>جارٍ التحميل...</Heading>;
};

export default BrowseHome;
