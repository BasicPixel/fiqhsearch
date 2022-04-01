import { useRouter } from "next/router";
import { useEffect } from "react";

import { Spinner } from "@chakra-ui/react";

import useLocalStorage from "hooks/useLocalStorage";

const BrowseHome = () => {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");
  const router = useRouter();

  useEffect(() => {
    () => {
      let routerMadhhab = madhhab ? madhhab : "hanbali";

      router.push(`browse/${routerMadhhab}`);
    };
  }, []);

  return <Spinner />;
};

export default BrowseHome;
