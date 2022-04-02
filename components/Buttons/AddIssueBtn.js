import LinkButton from "components/LinkButton";
import { FiPlus } from "react-icons/fi";

const AddIssueBtn = ({ madhhab }) => {
  return (
    <LinkButton
      href={`/admin/add/issue/${madhhab}`}
      icon={<FiPlus />}
      colorScheme={"teal"}
    >
      إضافة مسألة
    </LinkButton>
  );
};

export default AddIssueBtn;
