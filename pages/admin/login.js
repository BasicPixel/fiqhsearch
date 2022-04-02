import { useRouter } from "next/router";

import { Auth } from "@supabase/ui";

import supabase from "src/client";

const LoginPage = () => {
  const { user } = Auth.useUser();
  const router = useRouter();

  if (user) router.push("/admin");
  return (
    <div dir="ltr">
      <Auth supabaseClient={supabase} redirectTo={"/admin"} />
    </div>
  );
};

export default LoginPage;
