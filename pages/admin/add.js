import { Heading } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import IssueForm from "../../components/IssueForm";
import app from "../../src/client";

const AddIssue = () => {
  const [user, loading, error] = useAuthState(getAuth(app));
  const router = useRouter();

  if (!loading) {
    if (user) {
      return <IssueForm />;
    } else {
      router.back();
      return null;
    }
  } else {
    return <Heading>Loading...</Heading>;
  }
};

export default AddIssue;
