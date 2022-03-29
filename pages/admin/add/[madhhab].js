import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import supabase from "../../../src/client";

import { MADHHABS } from "../../../src/constants";

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

  const [topic, setTopic] = useState(topics[0].id);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [proof, setProof] = useState("");

  const [submitData, setSubmitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Stack spacing={4} pb={12}>
      <Heading>إضافة مسألة فقهية</Heading>
      <Text>
        اختر الباب الفقهي ثم اكتب السؤال والجواب والدليل، كلّا في مكانه المخصص.
      </Text>

      <Text>المذهب الفقهي: {MADHHABS[madhhab]}</Text>

      <Divider />

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
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
        </Stack>
      </form>

      {loading && (
        <Alert status="warning">
          <Spinner />
          <AlertTitle mr={2}>تتم إضافة المسألة...</AlertTitle>
        </Alert>
      )}

      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>حدثت مشكلة خلال إضافة المسألة</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!error && submitData && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle mr={2}>تمت إضافة المسألة الفقهية بنجاح</AlertTitle>
        </Alert>
      )}
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
