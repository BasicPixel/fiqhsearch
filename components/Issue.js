import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";

import { FiHelpCircle, FiCheckCircle, FiBook } from "react-icons/fi";

const Issue = ({ issue }) => {
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
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Issue;
