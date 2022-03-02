import { Button, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";
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
    </Stack>
  );
};

export default AdminInterface;
