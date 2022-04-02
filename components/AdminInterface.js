import { useRouter } from "next/router";

import {
  Button,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

import supabase from "src/client";
import useLocalStorage from "hooks/useLocalStorage";
import { MADHHABS } from "src/constants";
import AddSectionBtn from "./AddSectionBtn";
import AddTopicBtn from "./AddTopicButton";
import AddIssueBtn from "./AddIssueBtn";

const AdminInterface = ({ user }) => {
  const router = useRouter();
  const [madhhab] = useLocalStorage("madhhab");

  if (user)
    return (
      <Stack spacing={4}>
        <Heading>واجهة المسؤولين</Heading>
        <Text fontSize={"lg"}>
          المستخدم الحالي: <b>{user.email}</b>
        </Text>
        <Text>
          المذهب الحالي: <b>{MADHHABS[madhhab]}</b>
        </Text>
        <Divider />
        <SimpleGrid columns={2} gap={2}>
          <AddIssueBtn madhhab={madhhab} />
          <AddSectionBtn />
          <AddTopicBtn madhhab={madhhab} />
          <Button
            rightIcon={<FiLogOut />}
            onClick={() => {
              supabase.auth.signOut();
              router.push("/");
            }}
            colorScheme="red"
          >
            تسجيل الخروج
          </Button>
        </SimpleGrid>
      </Stack>
    );
  return <Heading textAlign={"center"}>You have to be logged in.</Heading>;
};

export default AdminInterface;
