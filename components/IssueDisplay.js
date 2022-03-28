import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const IssueDisplay = ({ issues }) => {
  return (
    <Accordion allowMultiple>
      {issues.map((issue) => (
        <AccordionItem key={issue.id} dir="ltr">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {issue.question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Heading></Heading>
            <Text>{issue.answer}</Text>
            <Heading></Heading>
            <Text>{issue.proof}</Text>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default IssueDisplay;
