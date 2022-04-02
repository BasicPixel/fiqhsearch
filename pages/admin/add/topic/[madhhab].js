import { useRouter } from "next/router";
import { useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

import supabase from "src/client";
import Form from "components/Form/Form";
import FormHeader from "components/Form/FormHeader";
import FormBody from "components/Form/FormBody";
import FormFeedback from "components/Form/FormFeedback";
import CustomAlert from "components/Form/CustomAlert";
import LinkButton from "components/LinkButton";

const AddIssue = ({ sections }) => {
  const router = useRouter();
  const madhhab = router.query.madhhab;

  const submitIssue = async () => {
    setSubmitData(null);
    setError(null);
    setLoading(true);

    const { data, error } = await supabase
      .from("topics")
      .insert([{ madhhab, section, name }]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSubmitData(data);
      setName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitIssue();
  };

  const [name, setName] = useState("");
  const [section, setSection] = useState(sections[0]?.id);

  const [submitData, setSubmitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (sections.length > 0)
    return (
      <Form>
        <FormHeader
          title={"إضافة مسألة فقهية"}
          description={
            "اختر اسم الباب الفقهي، وفي أي قسم يقع. مثل: الصلاة، الطهارة."
          }
        />

        <form onSubmit={handleSubmit}>
          <FormBody>
            <FormControl isRequired>
              <FormLabel htmlFor="section">القسم الفقهي</FormLabel>
              <Select
                id="section"
                dir="ltr"
                value={section}
                onChange={(e) => setSection(parseInt(e.target.value))}
              >
                {sections.map((el) => (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="name">اسم الباب / الفصل الفقهي</FormLabel>
              <Input
                id="name"
                type={"text"}
                placeholder="اسم الباب..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme={"blue"}>
              إضافة الباب
            </Button>
          </FormBody>
        </form>

        <FormFeedback>
          {loading && (
            <CustomAlert status={"warning"} title={"تتم إضافة الباب..."} />
          )}

          {error && (
            <CustomAlert
              status={"error"}
              title={"حدثت مشكلة خلال إضافة الباب"}
              description={error}
            />
          )}

          {!error && submitData && (
            <CustomAlert
              status={"success"}
              title={"تمت إضافة الباب الفقهي بنجاح"}
            />
          )}
        </FormFeedback>
      </Form>
    );
  return (
    <Stack spacing={2}>
      <Heading>ما من أقسام فقهية هنا.</Heading>
      <Text>لا يمكنك إضافة أبواب إلا بعد وجود أقسام داخل المذهب...</Text>
      <LinkButton href={"/admin/add/section"} icon={<FiPlus />}>
        أضف بابًا فقهيًا
      </LinkButton>
    </Stack>
  );
};

export default AddIssue;

export async function getServerSideProps(context) {
  const { data } = await supabase
    .from("sections")
    .select("id,name")
    .eq("madhhab", context.query.madhhab);

  return {
    props: { sections: data },
  };
}
