import { useRouter } from "next/router";
import useLocalStorage from "../../../hooks/useLocalStorage";

const AddIssue = () => {
  const [madhhab] = useLocalStorage("madhhab", "hanbali");
  const router = useRouter();

  if (user) {
    router.push(`/admin/add/${madhhab}`);
  } else {
    router.back();
  }
  return null;
};

export default AddIssue;
