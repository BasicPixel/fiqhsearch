import React from "react";
import AdminInterface from "../../components/AdminInterface";
import supabase from "../../src/client";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";

const Admin = () => {
  const user = supabase.auth.user();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/admin/login");
    }

    return () => console.log();
  }, [router, user]);

  return <AdminInterface />;
};

export default Admin;
