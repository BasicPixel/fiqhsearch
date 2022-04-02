import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { FiHelpCircle, FiCheckCircle, FiBook, FiEdit } from "react-icons/fi";
import LinkButton from "./LinkButton";

const Issue = ({ issue }) => {
  const { user } = Auth.useUser();

  return (
    <AccordionItem key={issue.id}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {issue.question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Stack spacing={4}>
          <Box>
            <Heading fontSize={"lg"} display="flex" gap={2} alignItems="center">
              <FiHelpCircle /> السؤال
            </Heading>
            <Text>{issue.question}</Text>
          </Box>
          <Box>
            <Heading fontSize={"lg"} display="flex" gap={2} alignItems="center">
              <FiCheckCircle /> الجواب
            </Heading>
            <Text>{issue.answer}</Text>
          </Box>
          <Box>
            <Heading fontSize={"lg"} display="flex" gap={2} alignItems="center">
              <FiBook /> الدليل
            </Heading>
            <Text>{issue.proof}</Text>
          </Box>
          {user && (
            <LinkButton href={`/admin/edit/${issue.id}`} icon={<FiEdit />}>
              تعديل المسألة
            </LinkButton>
          )}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Issue;
