import { Heading } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AdminInterface from "../components/AdminInterface";
import Login from "../components/Login";
import app from "../src/client";

const Admin = () => {
  const [user, loading] = useAuthState(getAuth(app));

  if (!loading) {
    return user ? <AdminInterface /> : <Login />;
  } else {
    return (
      <>
        <Heading textAlign={"center"} dir={"ltr"}>
          Loading...
        </Heading>
      </>
    );
  }
};

export default Admin;
