import Issue from "./Issue";
import { Accordion } from "@chakra-ui/react";

const IssueDisplay = ({ issues }) => {
  return (
    <Accordion allowMultiple>
      {issues.map((issue) => (
        <Issue key={issue.id} issue={issue} />
      ))}
    </Accordion>
  );
};

export default IssueDisplay;
