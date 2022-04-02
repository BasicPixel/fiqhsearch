import LinkButton from "components/LinkButton";
import { FiBook } from "react-icons/fi";

const AddSectionBtn = () => {
  return (
    <LinkButton
      href={`/admin/add/section`}
      icon={<FiBook />}
      colorScheme={"green"}
    >
      إضافة قسم فقهي
    </LinkButton>
  );
};

export default AddSectionBtn;
