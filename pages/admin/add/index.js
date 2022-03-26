import { Heading } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../../src/client";
import useLocalStorage from "../../../hooks/useLocalStorage";

const AddIssue = () => {
  const [user, loading] = useAuthState(getAuth(app));
  const [madhhab] = useLocalStorage("madhhab", "hanbali");
  const router = useRouter();

  if (!loading) {
    if (user) {
      router.push(`/admin/add/${madhhab}`);
    } else {
      router.back();
    }
    return null;
  } else {
    return <Heading>Loading...</Heading>;
  }
};

export default AddIssue;
