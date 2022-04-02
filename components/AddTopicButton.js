import LinkButton from "components/LinkButton";
import { FiFolderPlus } from "react-icons/fi";

const AddTopicBtn = ({ madhhab }) => {
  return (
    <LinkButton
      href={`/admin/add/topic/${madhhab}`}
      icon={<FiFolderPlus />}
      colorScheme={"purple"}
    >
      إضافة باب / فصل
    </LinkButton>
  );
};

export default AddTopicBtn;
