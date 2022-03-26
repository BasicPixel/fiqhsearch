import { Auth } from "@supabase/ui";
import React from "react";
import supabase from "../../src/client";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [user, setUser] = React.useState(null);

  const router = useRouter();

  supabase.auth.onAuthStateChange((e) => {
    if (e === "SIGNED_IN") setUser(supabase.auth.user());
  });

  if (user) router.push("/admin");
  return (
    <div dir="ltr">
      <Auth supabaseClient={supabase} />
    </div>
  );
};

export default LoginPage;
