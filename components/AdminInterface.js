import {
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiEdit, FiLogOut, FiPlus } from "react-icons/fi";
import app from "../src/client";

const AdminInterface = () => {
  const auth = getAuth(app);

  const [user, loading] = useAuthState(auth);

  return (
    <Stack spacing={4}>
      <Heading>واجهة المسؤولين</Heading>
      <Flex flexDirection={{ base: "column", md: "row" }} gap={2}>
        <Text fontSize={"lg"}>
          الحساب الحالي: <code>{loading ? <>...</> : user.email}</code>
        </Text>
        <Button
          leftIcon={<FiLogOut />}
          onClick={() => auth.signOut()}
          colorScheme="red"
        >
          تسجيل الخروج
        </Button>
      </Flex>
      <Divider />
      <SimpleGrid columns={2} columnGap={4}>
        <Link href={"/admin/add"} passHref>
          <Button leftIcon={<FiPlus />} colorScheme={"teal"}>
            إضافة مسألة جديدة
          </Button>
        </Link>
        <Button leftIcon={<FiEdit />} colorScheme={"green"}>
          تعديل مسألة
        </Button>
      </SimpleGrid>
    </Stack>
  );
};

export default AdminInterface;
