import React from "react";
import { useRouter } from "next/router";

import AdminInterface from "components/AdminInterface";
import supabase from "src/client";

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
