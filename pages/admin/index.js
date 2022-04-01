import React from "react";
import { useRouter } from "next/router";

import { Auth } from "@supabase/ui";

import AdminInterface from "components/AdminInterface";

const Admin = () => {
  const { user } = Auth.useUser();
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
