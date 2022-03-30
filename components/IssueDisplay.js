import { Accordion } from "@chakra-ui/react";

import Issue from "components/Issue";

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
