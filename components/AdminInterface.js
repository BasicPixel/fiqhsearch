import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiEdit, FiLogOut, FiPlus } from "react-icons/fi";
import supabase from "../src/client";

const AdminInterface = () => {
  const router = useRouter();

  const user = supabase.auth.user();

  if (user)
    return (
      <Stack spacing={4}>
        <Heading>واجهة المسؤولين</Heading>
        <Flex flexDirection={{ base: "column", md: "row" }} gap={2}>
          <Text fontSize={"lg"}></Text>
        </Flex>
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
  else return <Heading textAlign={"center"}>You have to be logged in.</Heading>;
};

export default AdminInterface;
