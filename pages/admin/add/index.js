import { useEffect } from "react";
import { useRouter } from "next/router";

import { Auth } from "@supabase/ui";

import useLocalStorage from "hooks/useLocalStorage";

const AddIssue = () => {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");
  const router = useRouter();

  const user = Auth.useUser();

  useEffect(() => {
    if (user) {
      router.push(`/admin/add/${madhhab}`);
    } else {
      router.back();
    }
    return () => {
      console.log();
    };
  }, []);

  return null;
};

export default AddIssue;
