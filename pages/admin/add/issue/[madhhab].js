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

const Add = ({ topics }) => {
  const router = useRouter();
  const madhhab = router.query.madhhab;

  const submitIssue = async () => {
    setSubmitData(null);
    setError(null);
    setLoading(true);

    const { data, error } = await supabase
      .from("issues")
      .insert([{ madhhab, topic, question, answer, proof }]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSubmitData(data);
      resetForm();
    }
  };

  const resetForm = () => {
    setAnswer("");
    setProof("");
    setQuestion("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitIssue();
  };

  const [topic, setTopic] = useState(topics[0]?.id);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [proof, setProof] = useState("");

  const [submitData, setSubmitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (topics.length > 0)
    return (
      <Form>
        <FormHeader
          title={"إضافة مسألة فقهية"}
          description={
            "اختر الباب الفقهي ثم اكتب السؤال والجواب والدليل، كلّا في مكانه المخصص."
          }
        />

        <form onSubmit={handleSubmit}>
          <FormBody>
            <FormControl isRequired>
              <FormLabel htmlFor="topic">الباب / الموضوع الفقهي</FormLabel>
              <Select
                id="topic"
                dir="ltr"
                value={topic}
                onChange={(e) => setTopic(parseInt(e.target.value))}
              >
                {topics.map((el) => (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="question">السؤال</FormLabel>
              <Input
                id="question"
                type={"text"}
                placeholder="نص السؤال..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="answer">الجواب</FormLabel>
              <Textarea
                id="answer"
                type={"text"}
                placeholder="نص الجواب..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={5}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="proof">الدليل</FormLabel>
              <Textarea
                id="proof"
                type={"text"}
                placeholder="دليل المسألة..."
                value={proof}
                onChange={(e) => setProof(e.target.value)}
                rows={5}
              />
            </FormControl>
            <Button type="submit" colorScheme={"blue"}>
              إضافة المسألة
            </Button>
          </FormBody>
        </form>

        <FormFeedback>
          {loading && (
            <CustomAlert status={"warning"} title={"تتم إضافة المسألة..."} />
          )}

          {error && (
            <CustomAlert
              status={"error"}
              title={"حدثت مشكلة خلال إضافة المسألة"}
              description={error}
            />
          )}

          {!error && submitData && (
            <CustomAlert
              status={"success"}
              title={"تمت إضافة المسألة الفقهية بنجاح"}
            />
          )}
        </FormFeedback>
      </Form>
    );
  return (
    <Stack spacing={2}>
      <Heading>ما من أبواب فقهية هنا.</Heading>
      <Text>لا يمكنك إضافة مسائل إلا بعد وجود أبواب داخل المذهب...</Text>
      <LinkButton href={"/admin/add/topic"} icon={<FiPlus />}>
        أضف بابًا فقهيًا
      </LinkButton>
    </Stack>
  );
};

export default Add;

export async function getServerSideProps(context) {
  const { data } = await supabase
    .from("topics")
    .select("id,name")
    .eq("madhhab", context.query.madhhab);

  return {
    props: { topics: data },
  };
}
