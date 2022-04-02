import { useRouter } from "next/router";
import Link from "next/link";

import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiLogOut, FiPlus, FiBook, FiFolderPlus } from "react-icons/fi";

import supabase from "src/client";
import LinkButton from "components/LinkButton";
import useLocalStorage from "hooks/useLocalStorage";
import { MADHHABS } from "src/constants";

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
          <LinkButton
            href={`/admin/add/issue/${madhhab}`}
            icon={<FiPlus />}
            colorScheme={"teal"}
          >
            إضافة مسألة
          </LinkButton>
          <LinkButton
            href={`/admin/add/section`}
            icon={<FiBook />}
            colorScheme={"green"}
          >
            إضافة قسم فقهي
          </LinkButton>
          <LinkButton
            href={`/admin/add/topic/${madhhab}`}
            icon={<FiFolderPlus />}
            colorScheme={"purple"}
          >
            إضافة باب / فصل{" "}
          </LinkButton>
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
