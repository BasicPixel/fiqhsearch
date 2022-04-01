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
import { FiLogOut, FiPlus } from "react-icons/fi";

import supabase from "src/client";

const AdminInterface = ({ user }) => {
  const router = useRouter();

  if (user)
    return (
      <Stack spacing={4}>
        <Heading>واجهة المسؤولين</Heading>
        <Text fontSize={"lg"}>المستخدم الحالي: {user.email}</Text>
        <Divider />
        <SimpleGrid columns={2} columnGap={4}>
          <Link href={`/admin/add`} passHref>
            <Button leftIcon={<FiPlus />} colorScheme={"teal"}>
              إضافة مسألة جديدة
            </Button>
          </Link>
          <Button
            leftIcon={<FiLogOut />}
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
